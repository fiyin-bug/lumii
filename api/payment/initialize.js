/* global process */

const PAYSTACK_API_URL = 'https://api.paystack.co';

function getSecretKey() {
  return String(process.env.PAYSTACK_SECRET_KEY || '').trim();
}

function getBaseUrl(req) {
  const protoHeader = req.headers['x-forwarded-proto'];
  const proto = Array.isArray(protoHeader) ? protoHeader[0] : (protoHeader || 'https');
  const hostHeader = req.headers['x-forwarded-host'] || req.headers.host || 'lumiprettycollection.com';
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
  return `${proto}://${host}`.replace(/\/$/, '');
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

function safeNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value === 'string') {
    const parsed = parseFloat(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function calculateAmountInKobo(items, fallbackAmount) {
  const itemsTotal = Array.isArray(items)
    ? items.reduce((total, item) => {
      const price = safeNumber(item?.price);
      const qty = Math.max(1, parseInt(item?.quantity, 10) || 1);
      return total + (price * qty);
    }, 0)
    : 0;

  const nairaTotal = itemsTotal > 0 ? itemsTotal : safeNumber(fallbackAmount);
  return Math.round(nairaTotal * 100);
}

function makeReference() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `LUMIS-${day}${month}${year}-${rand}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const secretKey = getSecretKey();
  if (!secretKey) {
    return res.status(500).json({
      success: false,
      message: 'Payment server misconfigured: PAYSTACK_SECRET_KEY is missing.',
    });
  }

  const body = parseBody(req);
  const {
    email,
    firstName,
    lastName,
    phone,
    shippingAddress,
    items,
    amount,
  } = body;

  if (!email || !firstName || !lastName || !phone || !shippingAddress || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ success: false, message: 'Missing required checkout fields.' });
  }

  const amountInKobo = calculateAmountInKobo(items, amount);
  if (!Number.isInteger(amountInKobo) || amountInKobo < 10000) {
    return res.status(400).json({
      success: false,
      message: 'Minimum order amount is ₦100.00 and must be a valid number.',
    });
  }

  const reference = makeReference();
  const callbackUrl = `${getBaseUrl(req)}/payment/callback`;

  const metadata = {
    customer_name: `${firstName} ${lastName}`,
    customer_email: String(email).trim().toLowerCase(),
    customer_phone: phone,
    shipping_address: shippingAddress,
    cart_items: items,
  };

  try {
    const paystackResponse = await fetch(`${PAYSTACK_API_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: String(email).trim().toLowerCase(),
        amount: amountInKobo,
        currency: 'NGN',
        reference,
        callback_url: callbackUrl,
        metadata,
      }),
    });

    const raw = await paystackResponse.text();
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      payload = null;
    }

    if (!paystackResponse.ok || !payload?.status) {
      return res.status(paystackResponse.status || 502).json({
        success: false,
        message: payload?.message || 'Failed to initialize transaction with Paystack.',
      });
    }

    return res.status(200).json({
      success: true,
      authorizationUrl: payload.data?.authorization_url,
      reference: payload.data?.reference || reference,
      accessCode: payload.data?.access_code,
    });
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: 'Unable to reach Paystack. Please retry shortly.',
      detail: error?.message,
    });
  }
}
