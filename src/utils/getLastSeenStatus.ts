export const getLastSeenStatus = (lastActivityTime: string): string => {
  const lastActivityDate = new Date(lastActivityTime);
  const currentTime = new Date();

  const timeDiff = currentTime.getTime() - lastActivityDate.getTime();

  const oneHour = 60 * 60 * 1000;
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const oneMonth = 30 * 24 * 60 * 60 * 1000;

  switch (true) {
    case timeDiff <= oneHour:
      return "last seen recently";
    case timeDiff <= twentyFourHours:
      return "last seen today";
    case timeDiff <= oneWeek:
      return "last seen last week";
    case timeDiff <= oneMonth:
      return "last seen last month";
    default:
      return "long ago";
  }
};
