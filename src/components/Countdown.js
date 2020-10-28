import React from 'react'
import moment from 'moment'


export default function Countdown({ until }) {
  const timeToMoment = (time) => {
    const now = moment()
    const startTime = moment.unix(time)
    const difference = moment.duration(startTime.diff(now))

    const hours = difference.hours()
    const minutes = difference.minutes()
    const seconds = difference.seconds()

    const hoursString = hours ? `${hours}h ` : ''
    const minutesString = !hours || !minutes ? `${minutes}m ` : ''
    const secondsString = `${seconds}s`

    return now >= startTime ? 'Started' : `${hoursString}${minutesString}${secondsString}`
  }

  return (
    <>
      {timeToMoment(until)}
    </>
  )
}
