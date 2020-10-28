import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import moment from 'moment'

import RacesDisplay from './components/RacesDisplay'

import './stylesheets/App.scss'

const categories = [
  ['Greyhound racing', '9daef0d7-bf3c-4f50-921d-8e818c60fe61'],
  ['Harness racing', '161d9be2-e909-4326-8c2c-35ed71fb460b'],
  ['Horse racing', '4a2788f8-e825-4d36-9894-efd4baf1cfae']
]

export default function App({ numRaces }) {
  const [races, setRaces] = useState([])
  const [filters, setFilters] = useState([])

  // This function makes a HTTP request to get the next 5 races
  const getRaces = useCallback((amount) => {
    axios.get(
      `https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${amount}`,
      { headers: { 'Content-type': 'application/json' }}
    )
    // Once the request resolves this orders the races
    // then sets a timeout so a new request will be made when a race has been started for 1 min
    .then((response) => {
      let newRaces = response.data.data.race_summaries
      let newNextIDs = response.data.data.next_to_go_ids

      // Set races to the sorted array
      setRaces(newNextIDs.map(id => newRaces[id]))

      // Use moment to calculate the MS between now and when the first race finishes
      // Then add 1000 * 60 (60 seconds) to that value
      let getMoreRacesIn = moment.unix(newRaces[newNextIDs[0]].advertised_start.seconds).diff(moment()) + 60 * 1000

      // Set a timeout to get the races again once a race has finished for 1 min
      setTimeout(() => {
        getRaces(amount)
      }, getMoreRacesIn)
    })
  }, [])

  // When the component is mounted it will first thing get all races 
  useEffect(() => {
    getRaces(numRaces)
  }, [numRaces, getRaces])

  // Function to toggle the filters when the checkbox is selected
  const toggleFilters = (e) => {
    // Get which category was selected from the data- values on the HTML element
    const category = e.currentTarget.dataset.categoryId

    // If the filters already contains the category remove it else add it
    setFilters(filters.includes(category) ? filters.filter(c => c !== category) : [...filters, category])
  }

  // Filter through the races selecting only those that have a category that's in the list of filters
  // Return all races if no categories have been selected
  const filteredRaces = () => {
    if(filters.length === 0 ) return races
    return races.filter(race => filters.includes(race.category_id))
  }

  return (
    <div className="App">
      <div id="filter">
        {/* Loop through the categories adding a checkbox with the correct values for each */}
        {categories.map(([name, id]) => (
          <label>
            <span className={filters.includes(id) && 'selected'} >{name}</span>
            <input type='checkbox' key={id} onClick={toggleFilters} data-category-id={id} checked={filters.includes(id)} />
          </label>
        ))}
      </div>
      <RacesDisplay races={filteredRaces()} />
    </div>
  )
}
