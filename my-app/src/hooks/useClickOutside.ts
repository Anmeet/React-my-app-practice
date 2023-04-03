import { RefObject, useEffect } from 'react'

type AnyEvent = MouseEvent | TouchEvent

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T> | Array<RefObject<T>>,
  handler: (event: AnyEvent) => void
): void {
  useEffect(() => {
    let refsArr: Array<RefObject<T>> = []
    if (!Array.isArray(refs)) {
      refsArr = [refs]
    } else {
      refsArr = [...refs]
    }

    const listener = (event: AnyEvent) => {
      const isClickInside = refsArr.some((ref) => {
        const el = ref?.current
        return !el || el.contains(event.target as Node)
      })

      // Do nothing if clicking ref's element or descendent elements
      if (isClickInside) {
        return
      }

      handler(event)
    }

    document.addEventListener(`mousedown`, listener)
    document.addEventListener(`touchstart`, listener)

    return () => {
      document.removeEventListener(`mousedown`, listener)
      document.removeEventListener(`touchstart`, listener)
    }

    // Reload only if ref or handler changes
  }, [refs, handler])
}
