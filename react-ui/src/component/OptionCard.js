import React from 'react'

const OptionCard = ({ location, updateChoice, isSelected }) => {
  return (
    <div className={ isSelected && 'selected' }>
      Option
      <p> { location } </p>
      <button onClick={ () => updateChoice(location) }>Vote!</button>
    </div>
  )
}

export default OptionCard