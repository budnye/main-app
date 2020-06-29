export function formatCurrency(value) {
  const num = parseFloat(value);
  return `R$ ${(Math.round(num * 100) / 100).toFixed(2)}`;
}
