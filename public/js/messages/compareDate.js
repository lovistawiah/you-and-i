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

        console.log(lastSeenDate)
        const monthNumber = lastSeenDate.getDate()
        const dayNumber = lastSeenDate.getDay()

        let hours = lastSeenDate.getHours()
        const minutes = lastSeenDate.getMinutes()
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
            dateText = "today"
            lastSeenDateMessage = `${dateText} at ${timeText}`
        } else {
            lastSeenDateMessage = `last seen: ${dayNumber}/${monthNumber}/${yearNumber} at ${timeText}`
        }

        return lastSeenDateMessage

    }

}