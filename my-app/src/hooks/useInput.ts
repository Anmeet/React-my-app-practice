import { useState } from 'react'

const useInput = <T extends string = string>(
  validateValue: (P: T) => boolean
) => {
  const [enteredValue, setEnteredValue] = useState<T | ''>('')
  const [isTouched, setIsTouched] = useState(false)

  const valueIsValid = validateValue(enteredValue as T)
  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value as T)
  }

  const inputBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true)
  }

  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  }
}

export default useInput
