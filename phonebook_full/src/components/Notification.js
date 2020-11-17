import React from 'react'

function Notification({ message }) {
  if (message === null) {
    return null
  }

    return (
      <div className={message.type}>
        <h1>{message.message}</h1>
      </div>
    )
}

export default Notification
