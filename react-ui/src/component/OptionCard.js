import React from 'react'

const OptionCard = ({ location, updateChoice, isSelected, voteTotal }) => {
  return (
    <section className={ `option-card ${isSelected ? 'selected' : ''}` } onClick={ () => updateChoice(location) }>
      <p className="option-vote-total"> { voteTotal } </p>
      <p className="option-location"> { location } </p>
      <img className="option-vote-button" src="https://s3-us-west-1.amazonaws.com/zuck-bucket/tick.png" alt="selection checkmark"/>
    </section>
  )
}

export default OptionCard