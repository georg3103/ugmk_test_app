export function transformDateToMonth(dateString: string): number {
  const [day, month, year] = dateString.split('/');
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const monthIndex = date.getMonth(); // Get the month index (0-based)

  return monthIndex;
}