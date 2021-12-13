/*
  This hook will run the call back after certain time of delay since the last action.
*/

import { useEffect } from 'react'
import useTimeout from './useTimeout'

/**
 * This hook will trigger cb function after delay time since the last dependencies changed.
 * @param cb the callback function
 * @param delay delay time in miliseconds
 * @param args arguments of callback function
 * @param dependencies list of dependencies to reset schedule
 */
export default function useDebounce(
	cb: Function,
	delay: number = 250,
	args: any[] = [],
	dependencies: any[] = [],
	includeFirstTimeout: boolean = false
) {
	const [reset, clear] = useTimeout(cb, delay, args)

	// schedule
	useEffect(reset, [...dependencies, reset])

	// clear previous timer
	useEffect(() => {
		if (!includeFirstTimeout) {
			clear()
		}
	}, [])
}
