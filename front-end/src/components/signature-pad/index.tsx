import { useEffect, useRef, useCallback, forwardRef } from 'react'
import SignaturePad, {
	FromDataOptions,
	PointGroup,
} from '../signature-pad/libs/signature-pad'
import { Events, FromDataUrlOptions, ImageTypes } from './libs/types'

const Signature = (
	{ canvasProps = {}, clearOnResize = true, ...signPadProps }: SignaturePadProps,
	ref?: any
): any => {
	const canvasEl = useRef<HTMLCanvasElement>(null)
	const signPadInstance = useRef<SignaturePad>(null)
	const { width, height } = canvasProps
	const {
		dotSize,
		throttle,
		maxWidth,
		minDistance,
		minWidth,
		penColor,
		velocityFilterWeight,
		signatureAsText,
		onSignatureChange = (evt: string) => {},
	} = signPadProps

	// Clear signature
	const clear = useCallback(() => {
		signPadInstance.current?.clear()
	}, [signPadInstance.current])

	// Check signature is empty?
	const isEmpty = useCallback(
		() => signPadInstance.current?.isEmpty(),
		[signPadInstance.current]
	)
	// Save signature as PNG, GPEG, SVG
	const toDataUrl = useCallback(
		(type: ImageTypes, encoderOptions: number | undefined): string =>
			signPadInstance.current?.toDataURL(type, encoderOptions) || '',
		[signPadInstance.current]
	)

	// Get latest signature
	const toData = useCallback(
		(): PointGroup[] | undefined => signPadInstance.current?.toData(),
		[]
	)
	// Draw sign pad with a PointGroup list
	const fromData = useCallback(
		(pointGroups: PointGroup[], formDataOptions: FromDataOptions) =>
			signPadInstance.current?.fromData(pointGroups, formDataOptions),
		[signPadInstance.current]
	)

	// Make the canvas context equals to its width and height in css
	const setCanvasSize = useCallback(() => {
		if (canvasEl.current) {
			canvasEl.current.width = canvasEl.current.scrollWidth
			canvasEl.current.height = canvasEl.current.scrollHeight
		}
	}, [])

	const resizeDebounceTimer = useRef<number>()
	const timeout = useRef<number>(200)

	const onResize = useCallback(() => {
		if (resizeDebounceTimer.current) {
			clearTimeout(resizeDebounceTimer.current)
		}
		// @ts-ignore
		resizeDebounceTimer.current = setTimeout(() => {
			if (isEmpty()) {
				return
			}

			// group points
			const data = toData() || []
			// text
			const text = signPadInstance.current?.getText()
			console.log('text outside, ', text)
			setCanvasSize()

			// clear
			signPadInstance.current?.clear()

			// draw text back
			if (text) {
				signPadInstance.current?.drawText(text)
			}

			// draw group points back
			if (data.length > 0) {
				fromData(data, { clear: false })
			}
		}, timeout.current)
	}, [])

	const beforeUpdateStroke = useCallback((evt: any) => {
		// console.log('beforeUpdateStroke', evt)
	}, [])

	const afterUpdateStroke = useCallback((evt: any) => {
		// console.log('afterUpdateStroke', evt)
	}, [])

	const beginStroke = useCallback((evt: any) => {
		// console.log('beginStroke', evt, isEmpty())
	}, [])

	const endStroke = useCallback((evt: any) => {
		// console.log('endStroke', evt, isEmpty())
		const data = toDataUrl(ImageTypes.PNG, undefined)
		onSignatureChange(data || '')
	}, [])

	// add canvas events
	const on = useCallback(() => {
		window.addEventListener(Events.RESIZE, onResize)
		signPadInstance.current?.on()

		signPadInstance.current?.addEventListener(
			'beforeUpdateStroke',
			beforeUpdateStroke
		)
		signPadInstance.current?.addEventListener(
			'afterUpdateStroke',
			afterUpdateStroke
		)
		signPadInstance.current?.addEventListener('beginStroke', beginStroke)
		signPadInstance.current?.addEventListener('endStroke', endStroke)
	}, [])

	// remove canvas events
	const off = useCallback(() => {
		window.removeEventListener(Events.RESIZE, onResize)
		// @ts-ignore
		signPadInstance.current?.off()
		signPadInstance.current?.removeEventListener(
			'beforeUpdateStroke',
			beforeUpdateStroke
		)
		signPadInstance.current?.removeEventListener(
			'afterUpdateStroke',
			afterUpdateStroke
		)
		signPadInstance.current?.removeEventListener('beginStroke', beginStroke)
		signPadInstance.current?.removeEventListener('endStroke', endStroke)
	}, [])

	// first load
	useEffect(() => {
		// @ts-ignore
		signPadInstance.current = new SignaturePad(
			// @ts-ignore
			canvasEl.current,
			signPadProps
		)
		// forward sign pad instance to its parent
		if (ref) {
			// eslint-disable-next-line no-param-reassign
			ref.current = signPadInstance.current
		}
		setCanvasSize()

		if (signatureAsText) {
			signPadInstance.current.drawText(signatureAsText)
		}

		// add events
		on()
		// remove events
		return off
	}, [
		height,
		width,
		clearOnResize,
		dotSize,
		throttle,
		maxWidth,
		minDistance,
		minWidth,
		penColor,
		velocityFilterWeight,
	])

	const saveAsPNG = useCallback(() => {
		if (isEmpty()) {
			return
		}
		const data = toDataUrl(ImageTypes.PNG, undefined)
		const img = new Image()
		img.src = data || ''
		document.body.append(img)
		onSignatureChange(data || '')
	}, [toDataUrl, onSignatureChange])

	const clearSignature = useCallback(() => {
		clear()
		onSignatureChange('')
	}, [clear, onSignatureChange])

	const undo = useCallback(() => {
		const data = toData()
		if (data) {
			data.pop() // remove last dot or line
			fromData(data, {})
			if (!isEmpty()) {
				const signature = toDataUrl(ImageTypes.PNG, undefined)
				onSignatureChange(signature || '')
				return
			}
			onSignatureChange('')
		}
	}, [toData, fromData, onSignatureChange])

	// @ts-ignore
	return (
		<>
			<div className='signpad-container'>
				<canvas ref={canvasEl} {...canvasProps} />
				<div className='signpad-toolbar'>
					<button type='button' className='btn' onClick={saveAsPNG}>
						Save as PNG
					</button>
					<button type='button' className='btn' onClick={undo}>
						Undo
					</button>
					<button type='button' className='btn' onClick={clearSignature}>
						Clear
					</button>
				</div>
			</div>
		</>
	)
}
export default forwardRef(Signature)

export interface SignaturePadProps {
	// signature_pad's props
	velocityFilterWeight?: number
	minWidth?: number
	maxWidth?: number
	minDistance?: number
	dotSize?: number | Function
	penColor?: string
	throttle?: number
	// props specific to the React wrapper
	canvasProps?: { width?: number; height?: number; className?: string }
	clearOnResize?: boolean
	base64Data?: string
	onSignatureChange?: (base64Data: string) => void
	signatureAsText?: string
}
