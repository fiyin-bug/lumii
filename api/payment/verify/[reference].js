/* global process */

const PAYSTACK_API_URL = 'https://api.paystack.co';

function getSecretKey() {
  return String(process.env.PAYSTACK_SECRET_KEY || '').trim();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const secretKey = getSecretKey();
    if (!secretKey) {
      return res.status(500).json({
        success: false,
        message: 'Payment server misconfigured: PAYSTACK_SECRET_KEY is missing.',
      });
    }

    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({ success: false, message: 'Reference is required.' });
    }

    const paystackResponse = await fetch(
      `${PAYSTACK_API_URL}/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          Accept: 'application/json',
        },
      }
    );

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
        message: payload?.message || 'Failed to verify transaction with Paystack.',
      });
    }

    return res.status(200).json({
      success: true,
      data: payload.data,
      message: 'Payment verified successfully.',
    });
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: 'Unable to reach Paystack verification service.',
      detail: error?.message,
    });
  }
}
