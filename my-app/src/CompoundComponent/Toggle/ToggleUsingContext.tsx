import * as React from 'react'
import Switch from '../../shared/Switch'

interface ToggleProps {
  //on?: boolean
  children?: React.ReactNode | any
  //toggle?: () => void
}

interface Props {
  children?: React.ReactNode
}

type ToggleContextType = {
  on: boolean
  toggle: () => void
}

export const ToggleContext = React.createContext<ToggleContextType>({
  on: false,
  toggle: () => {},
})

export const useToggleContext = () => {
  const context = React.useContext(ToggleContext)
  if (context === undefined) {
    throw new Error('useToggle must be used within a <Toggle />')
  }
  return context
}

export const ToggleUsingContext: React.FC<Props> = ({ children }) => {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  )
}

export const ToggleOn = ({ children }: ToggleProps) => {
  const { on } = useToggleContext()
  return on ? (children as JSX.Element) : null
}

export const ToggleOff = ({ children }: ToggleProps) => {
  const { on } = useToggleContext()
  return on ? null : (children as JSX.Element)
}

export const ToggleButton = ({ ...props }) => {
  const { on, toggle } = useToggleContext()
  return <Switch on={on} onClick={toggle} {...props} />
}
