import moment from 'moment'

// Use moment to calculate the time to show
export function humanizeTimeUntil (time) {
  // Find duration left until race starts
  const now = moment()
  const startTime = moment.unix(time)
  const difference = moment.duration(startTime.diff(now))

  // Pull out relevant times
  const hours = difference.hours()
  const minutes = difference.minutes()
  const seconds = difference.seconds()

  // Display hours only if hours is not 0
  const hoursString = hours ? `${hours}h ` : ''
  // Display minutes if minutes is not 0 OR if hours is not 0
  const minutesString = hours || minutes ? `${minutes}m ` : ''
  // Always display seconds
  const secondsString = `${seconds}s`

  // Return human readable string
  return now >= startTime ? `${-seconds}s ago` : `${hoursString}${minutesString}${secondsString}`
}