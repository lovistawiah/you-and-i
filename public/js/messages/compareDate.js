function compareDate(lastSeen) {
    if (lastSeen == "online") {
        return "online"
    }
    if (lastSeen != "online" && lastSeen != undefined) {
        let lastSeenDateMessage = ""
        let amPm = ""
        let dateText = ""
        let timeText = ""
        const lastSeenDate = new Date(lastSeen)
        const date = new Date()


        const monthNumber = lastSeenDate.getDate()
        const dayNumber = lastSeenDate.getDay()

        let hours = lastSeenDate.getHours()
        let minutes = lastSeenDate.getUTCMinutes()
        const yearNumber = lastSeenDate.getFullYear()

        amPm = hours >= 12 ? 'pm' : 'am'
        if (hours >= 12) {
            hours = Math.floor(hours - 12)
        }

        timeText = `${hours}:${minutes} ${amPm}`

        if (
            lastSeenDate.getDate() == date.getDate() &&
            lastSeenDate.getDay() == date.getDay() &&
            lastSeenDate.getFullYear() == date.getFullYear()
        ) {
            lastSeenDateMessage = `${dateText} a ${timeText}`
        } else {
            lastSeenDateMessage = `last seen: ${dayNumber}/${monthNumber}/${yearNumber} at ${timeText}`
        }

        return lastSeenDateMessage

    }

}

function selectedChannelDate(createdAt) {
    let amPm = ""
    const date = new Date(createdAt)
    let hours = date.getHours()
    let minutes = date.getMinutes()

    amPm = hours >= 12 ? 'pm' : 'am'
    if (hours >= 12) {
        hours = Math.floor(hours - 12)
    }
    minutes = minutes.toString()
    if (minutes.length == 1) {
        minutes = "0" + minutes
    }
    return `${hours}:${minutes} ${amPm}`

}