import { useCallback, useEffect, useRef } from 'react'
import SignaturePad from 'signature_pad'

export default function SignPad({ className }: any) {
	const canvasEl = useRef(null)
	const pad = useRef(null)

	// first run
	useEffect(() => {
		// @ts-ignore
		pad.current = new SignaturePad(canvasEl.current)
		// @ts-ignore
		canvasEl.current.width = canvasEl.current.scrollWidth
		// @ts-ignore
		canvasEl.current.height = canvasEl.current.scrollHeight
	}, [])
	// return <canvas ref={canvasEl}></canvas>
	return <canvas ref={canvasEl} className={className}></canvas>
}
