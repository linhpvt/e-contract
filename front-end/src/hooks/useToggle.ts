/*
  this hook is used to handle the toggle status
*/

import { useCallback, useState } from 'react'

export default function useToggle(initial: boolean) {
	const [value, setValue] = useState(initial)
	const setToggle = useCallback(() => setValue(!value), [setValue])
	return [value, setToggle]
}
