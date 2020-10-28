import React, { useEffect, useState } from 'react'

import { humanizeTimeUntil } from '../helpers/timeHelpers'


export default function Countdown({ until }) {
  // Initialize what the countdown should display
  const [humanTimeUntil, setHumanTimeUntil] = useState(humanizeTimeUntil(until))

  // Whenever the component is mounted run this
  useEffect(() => {
    // Start an interval that updates every seconds to update the countdown timer
    const intervalID = setInterval(() => {
      setHumanTimeUntil(humanizeTimeUntil(until))
    }, 1000)

    // When the component is unmounted cancel the interval
    return () => clearInterval(intervalID)
  }, [until])

  return (
    <>
      {humanTimeUntil}
    </>
  )
}
