import { isToday, format, formatDistanceToNow } from "date-fns";

function lastSeen(lastSeen: string) {
  if (!Date.parse(lastSeen)) {
    return lastSeen;
  }
  return formatDistanceToNow(lastSeen, { addSuffix: true });
}

function messageHeaderDate(messageDate: Date) {
  if (isToday(messageDate)) {
    return "Today";
  } else {
    return format(messageDate, "yyyy-MM-dd");
  }
}

export { messageHeaderDate, lastSeen };
