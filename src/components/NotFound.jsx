import React from 'react'

const NotFound = () => {
  return (
    <div
      style={{ minHeight: "calc(100vh - 80px)", position: "relative" }}
    >
      <h1
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute" }}
      >
        404 | Not Found.
      </h1>
    </div>
  )
}

export default NotFound
