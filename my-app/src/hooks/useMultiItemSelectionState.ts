import * as React from 'react'

export const toggleArrayElement = <T>(arr: T[], el: T) => {
  const existingItem = arr.find((it) => it === el)
  return existingItem ? arr.filter((item) => item !== el) : [...arr, el]
}

export const useMultiItemSelectionState = <T>(initialState: T[] = []) => {
  const [state, setState] = React.useState<T[]>(initialState)

  const toggleItem = React.useCallback(
    (item: T) =>
      setState((currentState) => toggleArrayElement(currentState, item)),
    []
  )

  const getIfItemIsSelected = React.useCallback(
    (item: T) => state.some((it) => it === item),
    [state]
  )

  const resetToInitial = React.useCallback(
    () => setState(initialState),
    [initialState]
  )

  const clear = React.useCallback(() => setState([]), [])

  return [
    state,
    { toggleItem, getIfItemIsSelected, resetToInitial, clear, set: setState },
  ] as const
}

export default useMultiItemSelectionState
