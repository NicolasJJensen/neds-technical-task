import moment from 'moment'

export function humanizeTimeUntil (time) {
  const now = moment()
  const startTime = moment.unix(time)
  const difference = moment.duration(startTime.diff(now))

  const hours = difference.hours()
  const minutes = difference.minutes()
  const seconds = difference.seconds()

  const hoursString = hours ? `${hours}h ` : ''
  const minutesString = hours || minutes ? `${minutes}m ` : ''
  const secondsString = `${seconds}s`

  return now >= startTime ? `${-seconds}s ago` : `${hoursString}${minutesString}${secondsString}`
}