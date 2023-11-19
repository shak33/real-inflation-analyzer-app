export function parseEuropeanNumber(number: string) {
  return parseFloat(number.replace(',', '.'))
}