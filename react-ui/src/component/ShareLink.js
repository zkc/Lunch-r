import React from 'react'

const ShareLink = ({ group_id , history }) => {
  const url = `https://lunch-r.herokuapp.com/join/${group_id}`
  return (
    <section  className="share-link orange-text" >
      <h3 className="share-title"> Copy Link and Share </h3>
      <input value={url} id="auto" />
      <div className="create group-button" onClick={() => history.push(`/join/${group_id}`)}></div>
    </section>
  )
}

export default ShareLink