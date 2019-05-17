const formatDate = (date) => {
  const parsedDate = Date.parse(date);
  const currentDate = new Date(parsedDate);

  let difference = Math.floor(
    (new Date() - currentDate) / (24 * 3600 * 1000),
  );

  if (difference === 0) {
    difference = Math.floor((new Date() - currentDate) / 1000);

    if (difference < 60) {
      return difference === 1
        ? `${difference} second ago` : `${difference} seconds ago`;
    }
    if (difference >= 60 && difference <= 3599) {
      const minutes = Math.floor(difference / 60);
      return minutes === 1
        ? `${minutes} minute ago` : `${minutes} minutes ago`;
    }

    if (difference >= 3600) {
      const hours = Math.floor(difference / 3600);

      return hours === 1
        ? `${hours} hour ago` : `${hours} hours ago`;
    }
  }
  if (difference < 8) {
    return difference === 1
      ? `${difference} day ago` : `${difference} days ago`;
  }

  return currentDate.toDateString();
};

export default formatDate;
