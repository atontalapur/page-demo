const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'US' });

export function formatCents(cents: number): string {
  return usd.format(cents / 100);
}
