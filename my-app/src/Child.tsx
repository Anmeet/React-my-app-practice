import React from 'react'
import { flushSync } from 'react-dom'

type AppProps = {
  callBack: (item: string) => void
}

const App: React.FC<AppProps> = ({ callBack }) => {
  const [childState, setChildState] = React.useState<string>('')

  const handleClick = () => {
    flushSync(() => setChildState('amit'))
  }
  callBack(childState)

  return (
    <>
      <div>I am child</div>
      <button onClick={handleClick}>click from child</button>
    </>
  )
}

export default App
