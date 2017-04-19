import React from 'react'

const OptionCard = ({ location, updateChoice, isSelected, voteTotal }) => {
  return (
    <div className={ `option-card ${isSelected ? 'selected' : ''}` }>
      <p className="option-vote-total" > { voteTotal } </p>
      <p className="option-location"> { location } </p>
      <div className="option-vote-button" onClick={ () => updateChoice(location) }>
        <img src="https://s3-us-west-1.amazonaws.com/zuck-bucket/tick.png" />
      </div>
    </div>
  )
}

export default OptionCard