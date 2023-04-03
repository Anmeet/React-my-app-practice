import * as React from 'react'
import useLatest from './hooks/useLatest'
import { useStateContext } from './context/StateContext'

export const Latest = () => {
  const [count, setCount] = React.useState(0)
  const latestCount = useLatest(count)
  const { state, setState } = useStateContext()

  function handleAlertClick() {
    setTimeout(() => {
      alert(`Latest count value: ${latestCount.current}`)
    }, 3000)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
      <h2>{state}</h2>
      <button onClick={() => setState('ashim')}>change Context</button>
    </div>
  )
}
