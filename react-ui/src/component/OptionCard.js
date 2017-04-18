import React from 'react'

const OptionCard = ({ location, updateChoice, isSelected, voteTotal }) => {
  return (
    <div className={ `option-card ${isSelected ? 'selected' : ''}` }>
      <p className="option-vote-total" > { voteTotal } </p>
      <p className="option-location"> { location } </p>
      <button className="option-vote-button" onClick={ () => updateChoice(location) }>Vote!</button>
    </div>
  )
}

export default OptionCard