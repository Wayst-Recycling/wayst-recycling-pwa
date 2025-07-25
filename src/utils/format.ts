export const formatcUsd = (balance: number | undefined) => {
  if (balance) {
    return balance.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  return (0).toLocaleString(undefined, { maximumFractionDigits: 2 });
};

export function removeNonDigit(amount: string) {
  // Remove any non-digit characters
  if (!amount) return '';

  return amount.replace(/[^0-9.]/g, '');
}

export function formatAmount(amount: string, currency?: '₦' | '$') {
  // Remove any non-digit characters
  const cleanAmount = removeNonDigit(amount);

  return `${currency ? `${currency} ` : ''}${
    cleanAmount
      ? parseFloat(cleanAmount).toLocaleString('en-us', {
          maximumFractionDigits: 2,
        })
      : ''
  }`;
}

export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
