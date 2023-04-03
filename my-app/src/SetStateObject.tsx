import React from 'react'
import { useSetState } from './hooks/useSetState'
import useObjectState from './hooks/useObjectState'

type Person = {
  name?: string
  age?: number
  class?: {
    grade: string
    id: number
  }
}

const SetStateObject = () => {
  //   const [person, setPerson] = useSetState<Person>({
  //     name: 'fatfish',
  //     age: 100,
  //     class: {
  //       grade: '1',
  //       id: 5,
  //     },
  //   })

  const [person, setPerson] = useObjectState({
    name: 'fatfish',
    age: 100,
    class: {
      grade: '1',
      id: 5,
    },
  })

  // Change the value of person in the normal setting mode
  const onSetName = () => {
    setPerson({
      name: 'medium',
      class: {
        grade: '10',
        id: 1,
      },
    })
  }
  //Use the callback function to change the value of person
  // const onSetAge = () => {
  //   setPerson(() => {
  //     return {
  //       age: 1000,
  //     }
  //   })
  // }

  return (
    <div>
      <p>name: {person.name}</p>
      <p>age: {person.age}</p>
      <p>class: {person.class?.grade}</p>
      <button onClick={onSetName}>change name</button>
      {/* <button onClick={onSetAge}>change age</button> */}
      <button onClick={() => {}}>change age</button>
    </div>
  )
}

export default SetStateObject
