export const formatDate = (dates: string | Date): string => {
  const date = typeof dates === "string" ? new Date(dates) : dates;
  // if the date is today return "Today"
  if (date.toDateString() === new Date().toDateString()) {
    return "Today";
  }

  // if the date is yesterday return "Yesterday"
  if (
    date.toDateString() ===
    new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
  ) {
    return "Yesterday";
  }

  // Get the month, add 1 (since it's zero-based), and pad with a leading '0' if needed.
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  // Get the day of the month and pad with a leading '0' if needed.
  const day = date.getDate().toString().padStart(2, "0");

  // Get the full year.
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export type noteType = {
  text: string;
  dateCreated: string | Date;
  id: string;
};
