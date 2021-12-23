/*
  This hook is used to keep the previous state
*/

import { useEffect, useRef } from 'react'

export default function usePrevious(data: any): any {
	const prev = useRef(data)
	setTimeout(() => {
		if (prev.current !== data) {
			prev.current = data
		}
	}, 0)
	return prev.current
	// // useRef, run synchronously
	// const lastCall = useRef(data)
	// const prevValue = useRef(data)

	// if (lastCall.current !== data) {
	// 	prevValue.current = lastCall.current
	// 	lastCall.current = data
	// }
	// return prevValue.current

	// Use useEffect to schedule and then return the current value
	// run asynchronously

	// const prevState = useRef(null)
	// useEffect(() => {
	// 	if (prevState.current !== data) {
	// 		prevState.current = data
	// 	}
	// })
	// return prevState.current
}
