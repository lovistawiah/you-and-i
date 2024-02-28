import { isToday, format, formatDistanceToNow } from "date-fns";

function lastSeen(lastSeen: string) {
  if (!lastSeen) return;
  if (!Date.parse(lastSeen)) {
    return lastSeen;
  }
  return formatDistanceToNow(lastSeen, { addSuffix: true });
}

function messageHeaderDate(messageDate: Date) {
  if (!messageDate) return;
  if (isToday(messageDate)) {
    return "Today";
  } else {
    return format(messageDate, "yyyy-MM-dd");
  }
}

export { messageHeaderDate, lastSeen };
