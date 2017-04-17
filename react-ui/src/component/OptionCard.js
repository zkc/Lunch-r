import React from 'react'

const OptionCard = ({ location, updateChoice, isSelected, voteTotal }) => {
  return (
    <div className={ isSelected && 'selected' }>
      Option
      <p> Votes: { voteTotal } </p>
      <p> { location } </p>
      <button onClick={ () => updateChoice(location) }>Vote!</button>
    </div>
  )
}

export default OptionCard