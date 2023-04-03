import * as React from 'react'
import BasicForm from './BasicForm'
import Component from './Component'
import useFetch from './hooks/useFetch'
import { usePutApi } from './hooks/useHttp'
import Parent from './Parent'
import SetStateObject from './SetStateObject'
import { Latest } from './Latest'
import Set from './Set'
import StateProvider from './context/StateContext'
// import {
//   Toggle,
//   ToggleOn,
//   ToggleOff,
//   ToggleButton,
// } from './CompoundComponent/Toggle/Toggle'
import {
  ToggleUsingContext,
  ToggleButton,
  ToggleOff,
  ToggleOn,
} from './CompoundComponent/Toggle/ToggleUsingContext'
import Toggle from './State-Reducer-Pattern/Toggle'
import SearchFilter from './MultipleFilter'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const url = `http://jsonplaceholder.typicode.com/posts`

function App() {
  const { data, error } = useFetch<Post[]>(url)
  const [fetch, setFetch] = React.useState<boolean>(false)

  const {
    response,
    error: putError,
    putRequest,
  } = usePutApi<Post, Post>({} as any)

  const handlePutRequest = async () => {
    await putRequest(`${url}/1`, {
      userId: 1,
      id: 1,
      title: 'amit',
      body: 'amit',
    })
  }

  if (error) return <p>There is an error.</p>
  if (!data) return <p>Loading...</p>

  console.log('res', response)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      className='App'
    >
      {/* <div>
        <BasicForm />
        <p>{data[0].title}</p>
        <Parent />
        <button onClick={handlePutRequest}>Update Post</button>
        <SetStateObject />

        <StateProvider>
          <Component />

          <Latest />
        </StateProvider>
        <Set />
      </div> */}
      <div style={{ marginRight: '40px', marginTop: '40px' }}>
        {/* <Toggle>
          <ToggleOn>I am on</ToggleOn>
          <ToggleOff>I am off</ToggleOff>
          <h1>I am children</h1>
          <ToggleButton />
        </Toggle> */}
        {/* <ToggleUsingContext>
          <ToggleOn>I am on</ToggleOn>

          <div>
            <ToggleOff>I am off</ToggleOff>
            <h1>I am children</h1>
          </div>

          <ToggleButton />
        </ToggleUsingContext> */}
        {/* <div>
          <span>State Reducer Pattern Below</span>
          <Toggle />
        </div> */}
        <div>
          <SearchFilter />
        </div>
      </div>
    </div>
  )
}

export default App
