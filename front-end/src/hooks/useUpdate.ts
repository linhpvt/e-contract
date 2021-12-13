/*
  This hook will trigger the callback function every time except the very first call it
*/

import { useEffect, useRef } from 'react'

export default function useUpdate(cb: Function, args: any[] = []): void {
	// A flag to know which call is the very first call.
	const firstRender = useRef(true)
	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false
			return
		}

		// always get called form the second call this hook
		cb(...args)
	})
}
