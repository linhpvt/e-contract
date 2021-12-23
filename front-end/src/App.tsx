import { useCallback, useEffect, useRef, useState } from 'react'
import Sigature from './components/signature-pad'
import SignPad from './components/SignPad'
import './App.css'
import Hooks from './pages/Hooks'
import SignaturePad from './components/signature-pad/libs/signature-pad'

function App() {
	const imgData = localStorage.getItem('img-data') || undefined
	const signPadRef = useRef<SignaturePad>(null)
	const [signature, setSignature] = useState('')
	const onSignatureChange = useCallback(signature => {
		// @ts-ignore
		setSignature(signPadRef.current?.getTrimmedCanvas().toDataURL() || '')
	}, [])

	useEffect(() => {
		console.log(signPadRef)
	})

	return (
		<div>
			<h1>E-Contract application</h1>

			<img src={signature} alt='' />
			<div style={{ height: 1200 }}></div>
			<div style={{ border: '1px solid green' }}>
				{/* <SignPad className='signature-pad' /> */}
				<Sigature
					ref={signPadRef}
					// @ts-ignore
					penColor='#3d3d3d'
					dotSize={0}
					base64Data={imgData}
					onSignatureChange={onSignatureChange}
					clearOnResize={true}
					canvasProps={{ className: 'signature-pad' }}
					signatureAsText='Le Pham Thi Thu'
				/>
			</div>
			<Hooks />
		</div>
	)
}

export default App
