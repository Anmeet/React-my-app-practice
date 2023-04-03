import React from 'react'

export type HandleSwitchClick = React.MouseEventHandler<HTMLInputElement>
type SwitchProps = {
  on?: boolean
  onClick?: HandleSwitchClick
}

const Switch: React.FC<SwitchProps> = ({ on, onClick, ...props }) => {
  return (
    <>
      <input type='checkbox' checked={on} onClick={onClick} />
      <span {...props} />
    </>
  )
}

export default Switch
