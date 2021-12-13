/* eslint-disable react/jsx-curly-newline */
import { useCallback, useRef, useState } from 'react'
import useFormCache, { FieldType } from '../hooks/useFormCache'
import useDebounce from '../hooks/useDebounce'
import useArray, { ArrayAction } from '../hooks/useArray'

const logger = () => console.log('OK, run this after timeout')
export default function Hooks(props: any) {
	const refDiv = useRef(null)
	const refDivHover = useRef(null)
	const [value, setValue] = useState(0)

	const { formData, onChange } = useFormCache('userForm', {
		name: '',
		age: 10,
		over18: true,
	})

	useDebounce(logger, 2000, [], [formData.name], true)

	const { array, append, push, removeAt, replaceAt, filter } = useArray<number>([
		1, 2, 6, 4, 5,
	])
	const filterCb = useCallback((val: number) => val > 50, [])
	const onFilter = useCallback(() => {
		const result = filter(filterCb)
		console.log('Filter, ', result)
	}, [filterCb, filter])

	const onSubmit = (e: any) => {
		e.preventDefault()
	}
	return (
		<>
			<div>{array.join(',')}</div>
			<div>
				<button
					type='button'
					onClick={() => append(Math.round(Math.random() * 100))}
				>
					Append
				</button>
			</div>
			<div>
				<button type='button' onClick={() => push(Math.round(Math.random() * 100))}>
					Push
				</button>
				<button type='button' onClick={() => removeAt(1)}>
					Remove At 1
				</button>
				<button type='button' onClick={() => replaceAt(1, 11)}>
					Replace At 1
				</button>
				<button type='button' onClick={onFilter}>
					Greater 10
				</button>
			</div>
			<form onSubmit={onSubmit}>
				<div>
					<label htmlFor='name'>Name: </label>
					<input onChange={onChange} type='text' name='name' value={formData.name} />
				</div>
				<div>
					<label htmlFor='age'>Name: </label>
					<input
						onChange={onChange}
						type='text'
						name='age'
						field-type={FieldType.NUMBER}
						value={formData.age}
					/>
				</div>

				<div>
					<label htmlFor='age'>Over 18: </label>
					<input
						onChange={onChange}
						type='checkbox'
						name='over18'
						field-type={FieldType.BOOLEAN}
						value={formData.over18}
						checked={formData.over18}
					/>
				</div>
				<div>
					<input
						type='submit'
						value={value}
						// @ts-ignore
						onClick={() => setValue(value + 1)}
					/>
				</div>
			</form>
			<div
				ref={refDiv}
				style={{ width: 100, height: 200, backgroundColor: 'blue' }}
			></div>

			<div
				ref={refDivHover}
				style={{
					width: 100,
					height: 200,
					backgroundColor: 'red',
				}}
			></div>
		</>
	)
}
