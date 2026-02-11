export const parsePrice = (value) => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== 'string') return 0;

  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatNaira = (value) => {
  const amount = parsePrice(value);
  return `₦${amount.toLocaleString('en-NG')}`;
};
