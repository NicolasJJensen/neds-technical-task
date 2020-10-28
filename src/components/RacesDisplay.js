import React from 'react'

export default function RacesDisplay({ races }) {
  return (
    <table className="RacesDisplay">
      <thead>
        <tr>
          <th>Meeting</th>
          <th>Race Number</th>
          <th>Starts In</th>
        </tr>
      </thead>
      <tbody>
        {races.map(race => (
          <tr key={race.race_id} >
            <td>{race.meeting_name}</td>
            <td>{race.race_number}</td>
            <td>{race.advertised_start.seconds}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
