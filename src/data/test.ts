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
export const notes: noteType[] = [
  {
    text: "Discussed Q3 results and planned for the new product launch. The marketing team will prepare a presentation.",
    dateCreated: "2025-08-04T10:00:00Z",
    id: "1",
  },
  {
    text: "Milk, eggs, bread, and a large bag of coffee beans. Don't forget the oat milk!",
    dateCreated: "2025-08-03T15:30:00Z",
    id: "2",
  },
  {
    text: "Brainstormed a few ideas for the new app. The main focus should be on a user-friendly interface and seamless cloud integration.",
    dateCreated: "2025-08-02T18:45:00Z",
    id: "3",
  },
  {
    text: "Finished 'The Silent Patient.' I thought the ending was incredibly well-done, though some parts of the middle felt a bit slow. We should plan to discuss the character development of Theo at our next meeting. I've also been thinking about the use of color symbolism throughout the book, particularly with Alicia's paintings. It seems to reflect her mental state. I'll prepare some discussion points to share.",
    dateCreated: "2025-08-01T12:00:00Z",
    id: "4",
  },
  {
    text: "Hike at the state park.",
    dateCreated: "2025-07-31T09:00:00Z",
    id: "5",
  },
  {
    text: "Found a bug in the user authentication module. The password reset link is expiring too quickly, likely due to a time zone issue on the server. I've been troubleshooting for a few hours now and have a couple of leads. I'm going to check the server's cron jobs and then the database timestamps. I think the most promising path is to check the `expires_at` field and ensure it's being generated with the correct UTC time. I've also left some notes for the rest of the team in the pull request to keep everyone in the loop.",
    dateCreated: "2025-07-30T16:20:00Z",
    id: "6",
  },
  {
    text: "Mom's birthday is on the 15th! Don't forget to order a cake and get a gift.",
    dateCreated: "2025-07-29T11:15:00Z",
    id: "7",
  },
  {
    text: "Want to try making homemade pasta carbonara. Found a great recipe online that uses guanciale instead of bacon, which should give it a more authentic flavor. I'll need to go to the Italian market to get the right ingredients, including pecorino romano cheese and fresh eggs. I'm excited to try this out for dinner on Friday.",
    dateCreated: "2025-07-28T19:00:00Z",
    id: "8",
  },
  {
    text: "Call the plumber.",
    dateCreated: "2025-07-27T08:30:00Z",
    id: "9",
  },
  {
    text: "Reviewed the monthly budget. Everything looks good, but I should look into increasing my savings contributions. I've been spending a bit more on dining out than I planned, so I'll try to cook at home more often next month. I also need to renew my gym membership before the end of the week. I'll set a reminder to do that on Thursday. I think I'll also start tracking my smaller expenses more closely to see if there are any other areas where I can cut back.",
    dateCreated: "2025-07-26T14:55:00Z",
    id: "10",
  },
];
