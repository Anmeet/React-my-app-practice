import * as React from 'react'

export const useSetState = <T>(initState: T) => {
  const [state, setState] = React.useState<T>(initState)

  const setMergeState = (value: T | (T & Function)) => {
    setState((prevValue) => {
      const newValue = typeof value === 'function' ? value(prevValue) : value
      return newValue ? { ...prevValue, ...newValue } : prevValue
    })
  }

  return [state, setMergeState] as const
}
