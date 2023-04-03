import * as React from 'react'

// An effect that only runs once a condition is met
// After running once it will never run again
export const useConditionalSingletonEffect = (
  condition: boolean,
  effect: () => any,
  deps?: any[]
) => {
  const hasRunRef = React.useRef(false)
  const cleanupRef = React.useRef<any>(null)

  React.useEffect(() => {
    if (condition && !hasRunRef.current) {
      cleanupRef.current = effect()
      hasRunRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  React.useEffect(
    () => () => {
      // We run the cleanup when the component unmounts only if
      // the conditional effect was run
      if (hasRunRef.current) {
        if (
          typeof cleanupRef.current === 'function' &&
          cleanupRef.current.length === 0
        )
          cleanupRef.current()
      }
    },
    []
  )
}
