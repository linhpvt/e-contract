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
	set: (newArray: T[]) => void
	clear: () => void
	filter: (cb: any) => T[]
	map: (cb: any) => any[]
	reduce: (cb: any, initial: any) => any
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

	const set = useCallback(
		(newArray: T[]) => setArray(() => newArray),
		[setArray]
	)
	const clear = useCallback(() => setArray(() => []), [setArray])
	const filter = useCallback((cb: any) => array.filter(cb), [array])
	const map = useCallback((cb: any) => array.map(cb), [array])
	const reduce = useCallback(
		(cb: any, initial: any) => array.reduce(cb, initial),
		[array]
	)

	return {
		array,
		push,
		append,
		removeAt,
		replaceAt,
		set,
		clear,
		filter,
		map,
		reduce,
	}
}
