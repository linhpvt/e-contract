import { useCallback, useState } from 'react'

export const ArrayAction = {
	filter: 'filter',
	map: 'map',
}
export default function useArray<T>(initial: T[]): {
	array: T[]
	push: (item: T) => void
	append: (item: T) => void
	removeAt: (index: number) => void
	replaceAt: (index: number, item: T) => void
	perform: (action: string, cb: Function, initial: any) => void
} {
	const [array, setArray] = useState(initial)

	const push = useCallback((item: T) => {
		setArray(array => [...array, item])
	}, [])

	const append = useCallback((item: T) => {
		setArray(array => [item, ...array])
	}, [])

	const removeAt = useCallback(
		(index: number) =>
			setArray(array => [
				...array.slice(0, index),
				...array.slice(index + 1, array.length),
			]),
		[]
	)

	const replaceAt = useCallback((index: number, item: T) => {
		setArray(array => [
			...array.slice(0, index),
			item,
			...array.slice(index + 1, array.length),
		])
	}, [])

	const perform = useCallback((action: string, cb: any, initial: any) => {
		switch (action) {
			case ArrayAction.filter:
				setArray(array => array.filter(cb))
				break
			case ArrayAction.map:
				setArray(array => array.map(cb))
				break
			default:
				break
		}
	}, [])

	return {
		array,
		push,
		append,
		removeAt,
		replaceAt,
		perform,
	}
}
