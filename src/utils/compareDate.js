import { isToday,format, formatDistanceToNow } from "date-fns";

function lastSeen(lastSeen){
  return formatDistanceToNow(lastSeen,{addSuffix: true})
}



function messageHeaderDate(messageDate) {
  if(isToday(messageDate)){
    return "Today"
  }else {
    return format(messageDate,'yyyy-MM-dd')
  }
}

export { messageHeaderDate ,lastSeen };
