import React from 'react'
import Child from './Child'

function Parent() {
  const onCallBack = (item: string) => {
    console.log('parent', item)
  }
  return (
    <>
      <div>Parent</div>
      <Child callBack={(item) => onCallBack(item)} />
    </>
  )
}

export default Parent
