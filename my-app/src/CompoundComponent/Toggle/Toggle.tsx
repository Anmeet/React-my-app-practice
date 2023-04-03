import * as React from 'react'
import Switch from '../../shared/Switch'

interface ToggleProps {
  on?: boolean
  children?: React.ReactNode | any
}

export const Toggle = ({ children }: ToggleProps) => {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  return React.Children.map(children, (child: any) => {
    return typeof child.type === 'string'
      ? (child as JSX.Element)
      : React.cloneElement(child, { on, toggle })
  })
}

export const ToggleOn = ({ children, on }: ToggleProps) => {
  return on ? (children as JSX.Element) : null
}

export const ToggleOff = ({ on, children }: ToggleProps) => {
  return on ? null : (children as JSX.Element)
}

export const ToggleButton = ({
  on,
  toggle,
  ...props
}: {
  on?: boolean
  toggle?: () => void
}) => {
  return <Switch on={on} onClick={toggle} {...props} />
}
