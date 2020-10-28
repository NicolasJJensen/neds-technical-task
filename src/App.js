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
  const [filters, setFilters] = useState([])

  useEffect(() => {
    getRaces(numRaces)
  }, [])

  const getRaces = (amount) => {
    axios.get(
      `https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${amount}`,
      { headers: { 'Content-type': 'application/json' }}
    )
    .then((response) => {
      let newRaces = response.data.data.race_summaries
      let newNextIDs = response.data.data.next_to_go_ids

      setRaces(newNextIDs.map(id => newRaces[id]))

      let getMoreRacesIn = moment.unix(newRaces[newNextIDs[0]].advertised_start.seconds).diff(moment()) + 60 * 1000

      setTimeout(() => {
        getRaces(amount)
      }, getMoreRacesIn)
    })
  }

  const toggleFilters = (e) => {
    const category = e.currentTarget.dataset.categoryId

    setFilters(filters.includes(category) ? filters.filter(c => c !== category) : [...filters, category])
  }

  const filteredRaces = () => (
    races.filter(race => filters.length === 0 || filters.includes(race.category_id))
  )

  return (
    <div className="App">
      <div id="filter">
        {categories.map(([name, id]) => (
          <button key={id} onClick={toggleFilters} data-category-id={id} >{name}</button>
        ))}
      </div>
      <RacesDisplay races={filteredRaces()} />
    </div>
  )
}
