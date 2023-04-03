import * as React from 'react'

export const useRefWithSetter = <T>(initialValue: T) => {
  const ref = React.useRef<T>(initialValue)

  const setRef = (newValue: T) => {
    ref.current = newValue
  }

  return [ref, setRef] as const
}
