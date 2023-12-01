export function getDifferenceInDays(date1: number, date2: number) {
  const diff = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
  return diff;
}
