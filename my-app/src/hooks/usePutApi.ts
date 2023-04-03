import React from 'react'

interface IGetHook<T, M> {
  response: T | null
  error: Error | null
  putRequest: (url: string, data: M) => void
}
export function usePutApi<T, M>(defaultValue: T): IGetHook<T, M> {
  const [response, setResponse] = React.useState<T>(defaultValue)
  const [error, setError] = React.useState<Error | null>(null)
  const putRequest = React.useCallback((url: string, data: M) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (apiResponse) => {
      if (apiResponse.ok) {
        setResponse((await apiResponse.json()) as unknown as T)
      } else {
        setError(new Error(apiResponse.statusText))
      }
    })
  }, [])
  return { response, error, putRequest }
}
