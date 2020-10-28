import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import RacesDisplay from './components/RacesDisplay'

const categories = [
  ['Greyhound racing', '9daef0d7-bf3c-4f50-921d-8e818c60fe61'],
  ['Harness racing', '161d9be2-e909-4326-8c2c-35ed71fb460b'],
  ['Horse racing', '4a2788f8-e825-4d36-9894-efd4baf1cfae']
]

export default function App({ numRaces }) {
  const [races, setRaces] = useState([])
  const [nextIDs, setNextIDs] = useState([])

  useEffect(() => {
    getRaces(numRaces)
  }, [])

  const getRaces = (amount) => {
    axios.get(
      `https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${amount}`,
      { headers: { 'Content-type': 'application/json' }}
    )
    .then((response) => {
      console.log(response.data.data.race_summaries)
      let newRaces = Object.values(response.data.data.race_summaries)
      let newNextIDs = response.data.data.next_to_go_ids

      setRaces(newRaces)
      setNextIDs(newNextIDs)
    })
  }

  return (
    <div className="App">
      <RacesDisplay races={races} />
    </div>
  )
}
