function lastSeen(status) {
  const statusDate = new Date(status);
  const date = new Date();
  const monthNumber = statusDate.getMonth();
  const dayNumber = statusDate.getDate();
  const yearNumber = statusDate.getFullYear();

  let hours = statusDate.getHours();
  let minutes = statusDate.getMinutes();

  amPm = hours >= 12 ? "pm" : "am";
  if (hours > 12) {
    hours = Math.floor(hours - 12);
  }
  minutes = minutes.toString();
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }
  timeText = `${hours}:${minutes} ${amPm}`;

  if (
    statusDate.getMonth() == date.getMonth() &&
    statusDate.getDate() == date.getDate() &&
    statusDate.getFullYear() == date.getFullYear()
  ) {
    dateText = "today";
    lastSeenDateMessage = `last seen: ${dateText} at ${timeText}`;
  } else {
    lastSeenDateMessage = `last seen: ${dayNumber}/${monthNumber}/${yearNumber} at ${timeText}`;
  }

  return lastSeenDateMessage;
}

function messageStatus(createdAt) {
  let amPm = "";
  const date = new Date(createdAt);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  amPm = hours >= 12 ? "pm" : "am";
  if (hours > 12) {
    hours = Math.floor(hours - 12);
  }
  minutes = minutes.toString();
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }
  return `${hours}:${minutes} ${amPm}`;
}

function messageHeaderDate(messageDate) {
  const date = new Date();
  if(!messageDate) return
  messageDate = new Date(messageDate);

  const monthNumber = date.getMonth();
  const dayNumber = date.getDate();
  const yearNumber = date.getFullYear();

  if (
    dayNumber === messageDate.getDate() &&
    monthNumber === messageDate.getMonth() &&
    yearNumber === messageDate.getFullYear()
  ) {
    return "Today";
  } else {
    // Add 1 to the month for a human-readable month number
    const formattedMonth = messageDate.getMonth() + 1;

    return `${messageDate.getDate()}/${formattedMonth}/${messageDate.getFullYear()}`;
  }
}

export { lastSeen, messageHeaderDate, messageStatus };
