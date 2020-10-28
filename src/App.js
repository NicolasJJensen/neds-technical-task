import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

export default function App() {
  const [races, setRaces] = useState()
  const [nextToGo, setNextToGo] = useState()

  useEffect(() => {
    getRaces()
  }, [])

  const getRaces = () => {

  }

  return (
    <div className="App">
    </div>
  )
}
