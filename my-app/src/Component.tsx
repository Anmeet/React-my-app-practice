import { ChangeEvent, useState } from 'react'
import useInterval from './hooks/useInterval'
import { useStateContext } from './context/StateContext'

export default function Component() {
  // The counter
  const [count, setCount] = useState<number>(0)
  // Dynamic delay
  const [delay, setDelay] = useState<number>(1000)
  // ON/OFF
  const [isPlaying, setPlaying] = useState<boolean>(false)

  const { state, setState } = useStateContext()

  useInterval(
    () => {
      // Your custom logic here
      setCount(count + 1)
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? delay : null
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value))
  }

  console.log('state', state)

  return (
    <>
      <h1>{count}</h1>
      <h2>{state}</h2>
      <button onClick={() => setPlaying(!isPlaying)}>
        {isPlaying ? 'pause' : 'play'}
      </button>
      <p>
        <label htmlFor='delay'>Delay: </label>
        <input
          type='number'
          name='delay'
          onChange={handleChange}
          value={delay}
        />
      </p>
      <button onClick={() => setState('amit')}>Check Context</button>
    </>
  )
}
