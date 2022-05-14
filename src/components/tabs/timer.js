import React, { useState } from 'react'

import { useTimer } from 'react-timer-hook'

function MyTimer (expiryTimestamp) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => Reset()
  })

  function Reset () {
    // Restarts to 5 minutes timer
    const time = new Date()
    time.setSeconds(time.getSeconds() + 300)
    restart(time, true);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '16px' }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  )
}

export default () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 300)
  return MyTimer(time)
}
