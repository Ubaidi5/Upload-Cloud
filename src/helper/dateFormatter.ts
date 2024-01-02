export function dateFormatter(date_str: any) {
  let date = "0" + new Date(date_str).getDate();
  let month = new Date(date_str).getMonth() + 1;
  let year = new Date(date_str).getFullYear();

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${date.slice(-2)} ${months[month]} ${year}`;
}
