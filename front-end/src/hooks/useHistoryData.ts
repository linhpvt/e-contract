import { useCallback, useEffect, useRef, useState } from 'react'

export default function useHistoryData<T>(
	initial: T,
	capacity: number = 10
): { value: T; next: () => void; previous: () => void } {
	const [value, setValue] = useState(initial)
	const currentPosition = useRef(-1)
	const listData = useRef([])
	const capacityRef = useRef(capacity)

	const next = useCallback(() => {
		let curIndex = currentPosition.current
		if (curIndex < listData.current.length - 1) {
			curIndex++
			currentPosition.current = curIndex
			setValue(listData.current[curIndex])
		}
	}, [])

	const previous = useCallback(() => {
		let curIndex = currentPosition.current
		if (curIndex > 0) {
			curIndex--
			currentPosition.current = curIndex
			setValue(listData.current[curIndex])
		}
	}, [])

	// set capacity
	useEffect(() => {
		if (capacity > capacityRef.current) {
			capacityRef.current = capacity
		}
	}, [capacity])

	// set value when change
	useEffect(() => {
		if (listData.current.length <= capacityRef.current) {
			// @ts-ignore
			listData.current = [...listData.current, initial]
			currentPosition.current++
		} else {
			const [_, ...rest] = listData.current
			// @ts-ignore
			listData.current = [...rest, initial]
		}
		setValue(listData.current[currentPosition.current])
		console.log('list, position', listData.current, currentPosition.current)
	}, [initial])

	return {
		value,
		next,
		previous,
	}
}
