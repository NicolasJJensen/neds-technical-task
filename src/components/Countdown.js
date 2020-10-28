import React, { useEffect, useState } from 'react'

import { humanizeTimeUntil } from '../helpers/timeHelpers'


export default function Countdown({ until }) {
  const [humanTimeUntil, setHumanTimeUntil] = useState(humanizeTimeUntil(until))

  useEffect(() => {
    const intervalID = setInterval(() => {
      setHumanTimeUntil(humanizeTimeUntil(until))
    }, 1000)

    return () => clearInterval(intervalID)
  }, [until])

  return (
    <>
      {humanTimeUntil}
    </>
  )
}
