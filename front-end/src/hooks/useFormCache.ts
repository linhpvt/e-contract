/*
  1. this hook is used to collect data of any form
  2. populate form from local storage when user refresh page.
*/

import { useCallback, useEffect, useState } from 'react'

export const FieldType = {
	NUMBER: 'number',
	STRING: 'string',
	BOOLEAN: 'boolean',
}
export default function useFormCache(formKey: string, initial: any) {
	const [formData, setFieldValue] = useState(() => getStorage(formKey, initial))
	const onChange = useCallback(
		(e: any) => {
			const name = e.target.name || ''
			let fieldVal = e.target.value || ''
			const fieldType = e.target.getAttribute('field-type') || ''
			switch (fieldType) {
				case FieldType.BOOLEAN:
					fieldVal = e.target.checked
					break
				case FieldType.NUMBER:
					fieldVal = toFloat(fieldVal, '')
					break
				default:
					break
			}
			setFieldValue((current: any) => ({ ...current, [name]: fieldVal }))
		},
		[setFieldValue]
	)

	// persist every change to local storage
	// -> no dependency
	useEffect(() => {
		setTimeout(() => setStorage(formKey, formData), 0)
	})
	return {
		formData,
		onChange,
	}
}

// support functions
function toFloat(value: string, defaultValue: any) {
	try {
		const val = parseFloat(value)
		return isNaN(val) ? defaultValue : val
	} catch (e) {
		return defaultValue
	}
}

function setStorage(key: string, formData: any): void {
	const strFormData = JSON.stringify(formData)
	localStorage.setItem(key, strFormData)
}

function getStorage(key: string, defaultValue: any): any {
	console.log('start', Date.now())
	const str = localStorage.getItem(key) || ''
	try {
		const formData = JSON.parse(str)
		return formData || defaultValue
	} catch (e) {
		return defaultValue
	}
}
