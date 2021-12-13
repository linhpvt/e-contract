/*
  This hook is used to setup a function running after a timeout.
  It also provides us the way you can reset the schedule or clear it from running away.
*/

import { useCallback, useEffect, useRef } from 'react'

// IMPORTANT: make sure the callback will run once right after timeout
let CB_RUNNING = false

export default function useTimeout(
	cb: Function,
	delay: number = 250,
	args: any[] = []
): [reset: () => void, clear: () => void] {
	const timer = useRef(null)

	const set = useCallback(() => {
		// @ts-ignore
		timer.current = setTimeout(() => {
			if (CB_RUNNING) {
				return
			}
			CB_RUNNING = true
			cb(...args)
			// BE SURE THE FIRST TIMEOUT GET RUN AND THE NEXT ONE NOT
			setTimeout(() => (CB_RUNNING = false), 50)
		}, delay)
	}, [...args, cb, delay])

	const clear = useCallback(() => {
		if (timer.current) {
			// @ts-ignore
			clearTimeout(timer.current)
		}
	}, [])

	const reset = useCallback(() => {
		clear()
		set()
	}, [clear, set])

	useEffect(() => {
		// schedule
		set()
		// clean up schedule
		return clear
	}, [clear, set])

	return [reset, clear]
}
