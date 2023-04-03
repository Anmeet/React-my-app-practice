import React, { LegacyRef } from 'react'
import Switch from '../shared/Switch'

export type ToggleAction =
  | { type: 'toggle' }
  | { type: 'reset'; initialState: ToggleState }
const actionTypes = {
  toggle: 'toggle' as const,
  reset: 'reset' as const,
}

export interface ToggleState {
  on: boolean
}

type HandleClick<T> = React.MouseEventHandler<T>

type GetToggler<T> = {
  onClick?: HandleClick<T>
  on?: boolean
  [otherProps: string]: any
}

const callAll =
  (...fns: any[]) =>
  (...args: any[]) =>
    fns.forEach((fn) => fn && fn(...args))

const toggleReducer = (
  state: ToggleState,
  action: ToggleAction
): ToggleState => {
  switch (action.type) {
    case actionTypes.toggle: {
      return { on: !state.on }
    }
    case actionTypes.reset: {
      return action.initialState
    }
    default: {
      throw new Error(`Unsupported type`)
    }
  }
}

const useToggle = ({ initialOn = false, reducer = toggleReducer }) => {
  const { current: initialState } = React.useRef({
    on: initialOn,
  } as ToggleState)
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const useToggleOn = state.on

  const toggle = () => dispatch({ type: actionTypes.toggle })
  const reset = () => dispatch({ type: actionTypes.reset, initialState })

  const getTogglerProps = <T extends GetToggler<T>>({
    onClick,
    on: userProvidedOn,
    ...rest
  }: GetToggler<T>): GetToggler<T> => {
    const on = userProvidedOn || useToggleOn
    return {
      on: on,
      'aria-pressed': on,
      onClick: onClick ? callAll(onClick, toggle) : toggle,
      ...rest,
    }
  }

  const getResetterProps = <T = {},>({
    onClick,
    ...rest
  }: Omit<GetToggler<T>, 'on'>) => ({
    onClick: onClick ? callAll(onClick, reset) : reset,
    ...rest,
  })

  return {
    on: state.on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  }
}

/** Alternative Code to below */
{
  /* const toggleStateReducer =
  (clickedTooMuch: boolean) =>
  (state: ToggleState, action: ToggleAction): ToggleState => {
    if (action.type === 'toggle' && clickedTooMuch) {
      return { on: state.on }
    }
    return toggleReducer(state, action)
  }  */
}

const toggleStateReducer =
  (clickedTooMuch: boolean) => (state: ToggleState, action: ToggleAction) => {
    if (action.type === 'toggle' && clickedTooMuch) {
      return { on: state.on }
    }
    return toggleReducer(state, action)
  }

const Toggle = () => {
  const [timesClicked, setTimesClicked] = React.useState<number>(0)
  const clickedTooMuch = timesClicked >= 4
  const { on, getResetterProps, getTogglerProps } = useToggle({
    reducer: toggleStateReducer(clickedTooMuch),
  })

  return (
    <div>
      <Switch
        {...getTogglerProps({
          on: on,
          onClick: () => setTimesClicked((count) => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid='notice'>
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid='click-count'>Click count: {timesClicked}</div>
      ) : null}
      <button {...getResetterProps({ onClick: () => setTimesClicked(0) })}>
        Reset!!!
      </button>
    </div>
  )
}

export default Toggle
