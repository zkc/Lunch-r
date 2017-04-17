import React from 'react'

const OptionCard = ({ location, update, isSelected }) => {
  return (
    <div className={ isSelected && 'selected' }>
      Option
      <p> { location } </p>
      <button onClick={ () => update(location) }>Vote!</button>
    </div>
  )
}

export default OptionCard