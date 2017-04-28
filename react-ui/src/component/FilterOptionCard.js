import React from 'react'

const FilterOptionCard = ({ topPad, location, updateChoice, listNum }) => {
  // style={{'margin-top':`${topPad}px`}}
  return (
    <section  className={ `filter-option option-card`} onClick={ () => updateChoice(location) }>
      <p className="option-location"> { location } </p>
      <img className="option-vote-button" src="https://s3-us-west-1.amazonaws.com/zuck-bucket/forbidden-mark-orange.png" alt="remove option"/>
    </section>
  )
}

export default FilterOptionCard