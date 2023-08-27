export const calculateTime = (eventTime) => {
  const now = new Date();
  const eventDate = new Date(eventTime);
  const timeDifference = eventDate - now;
  if (timeDifference > 0) {
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    const minutes = Math.floor(
      (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
    );
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  } else {
    return null; // Event already passed
  }
};
