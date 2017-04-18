import React from 'react'

const OptionCard = ({ location, updateChoice, isSelected, voteTotal }) => {
  return (
    <div className={ isSelected && 'selected' }>
      <p> { location } </p>
      <p> Votes: { voteTotal } </p>
      <button onClick={ () => updateChoice(location) }>Vote!</button>
    </div>
  )
}

export default OptionCard