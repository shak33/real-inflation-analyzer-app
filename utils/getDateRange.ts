export function getDateRange(dateString: Date) {
  const date = new Date(dateString);
  const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  
  return { startDate, endDate };
}
