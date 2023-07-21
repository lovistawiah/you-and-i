function compareDate(lastSeen) {
    const lastSeenDate = new Date(lastSeen)
    const date = new Date()
    const monthNumber = lastSeenDate.getMonth()
    const dayNumber = lastSeenDate.getDate()
    const yearNumber = lastSeenDate.getFullYear()

    let hours = lastSeenDate.getHours()
    let minutes = lastSeenDate.getMinutes()

    amPm = hours >= 12 ? 'pm' : 'am'
    if (hours > 12) {
        hours = Math.floor(hours - 12)
    }
    minutes = minutes.toString()
    if (minutes.length == 1) {
        minutes = "0" + minutes
    }
    timeText = `${hours}:${minutes} ${amPm}`

    if (
        lastSeenDate.getMonth() == date.getMonth() &&
        lastSeenDate.getDate() == date.getDate() &&
        lastSeenDate.getFullYear() == date.getFullYear()
    ) {
        dateText = "today"
        lastSeenDateMessage = `last seen: ${dateText} at ${timeText}`
    } else {
        lastSeenDateMessage = `last seen: ${dayNumber}/${monthNumber}/${yearNumber} at ${timeText}`
    }

    return lastSeenDateMessage

}


function chatOrMessageTime(createdAt) {
    let amPm = ""
    const date = new Date(createdAt)
    let hours = date.getHours()
    let minutes = date.getMinutes()

    amPm = hours >= 12 ? 'pm' : 'am'
    if (hours > 12) {
        hours = Math.floor(hours - 12)
    }
    minutes = minutes.toString()
    if (minutes.length == 1) {
        minutes = "0" + minutes
    }
    return `${hours}:${minutes} ${amPm}`
}

function messageHeaderDate(messageDate) {
    const date = new Date()
    messageDate = new Date(messageDate)

    const monthNumber = date.getMonth()
    const dayNumber = date.getDate()
    const yearNumber = date.getFullYear()
    if (
        dayNumber == messageDate.getDate() &&
        monthNumber == messageDate.getMonth() &&
        yearNumber == messageDate.getFullYear()
    ) {
        return "Today"
    }
    else {
        return `${messageDate.getDate()}/${messageDate.getMonth()}/${messageDate.getFullYear()}`
    }
}