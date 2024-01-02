import React, { createContext, useState, useMemo, useContext } from 'react'

interface Props {
  children: React.ReactNode
}

type StateContextType = {
  state: string
  setState: (value: string) => void
}

export const StateContext = createContext<StateContextType>({
  state: '',
  setState: () => {},
})

export const useStateContext = () => {
  const context = useContext(StateContext)

  if (context === undefined) {
    throw new Error('Context should be bounded inside the provider')
  }
  return context
}

const StateProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<string>('ramesh')
  const memoizedValue = useMemo(() => ({ state, setState }), [state])

  return (
    <StateContext.Provider
      value={{
        state: memoizedValue.state,
        setState: memoizedValue.setState,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export default StateProvider
