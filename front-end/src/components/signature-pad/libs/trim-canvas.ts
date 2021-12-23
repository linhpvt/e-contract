// returns the RGBA values of an x, y coord of imgData
function getRGBA(
	x: number,
	y: number,
	imgWidth: number,
	imgData: Uint8ClampedArray
) {
	return {
		red: imgData[(imgWidth * y + x) * 4],
		green: imgData[(imgWidth * y + x) * 4 + 1],
		blue: imgData[(imgWidth * y + x) * 4 + 2],
		alpha: imgData[(imgWidth * y + x) * 4 + 3],
	}
}

function getAlpha(
	x: number,
	y: number,
	imgWidth: number,
	imgData: Uint8ClampedArray
) {
	return getRGBA(x, y, imgWidth, imgData).alpha
}

// finds the first y coord in imgData that is not white
function scanY(
	fromTop: boolean,
	imgWidth: number,
	imgHeight: number,
	imgData: Uint8ClampedArray
) {
	const offset = fromTop ? 1 : -1
	const firstCol = fromTop ? 0 : imgHeight - 1

	// loop through each row
	for (let y = firstCol; fromTop ? y < imgHeight : y > -1; y += offset) {
		// loop through each column
		for (let x = 0; x < imgWidth; x++) {
			// if not white, return col
			if (getAlpha(x, y, imgWidth, imgData)) {
				return y
			}
		}
	}

	// the whole image is white already
	return 0
	// return null;
}

// finds the first x coord in imgData that is not white
function scanX(
	fromLeft: boolean,
	imgWidth: number,
	imgHeight: number,
	imgData: Uint8ClampedArray
) {
	const offset = fromLeft ? 1 : -1
	const firstRow = fromLeft ? 0 : imgWidth - 1

	// loop through each column
	for (let x = firstRow; fromLeft ? x < imgWidth : x > -1; x += offset) {
		// loop through each row
		for (let y = 0; y < imgHeight; y++) {
			// if not white, return row
			if (getAlpha(x, y, imgWidth, imgData)) {
				return x
			}
		}
	}

	// the whole image is white already
	return 0
	// return null
}

/**
 * Trim whitespaces arround the passing canvas
 * @param canvas The canvas we want to trim whitespaces arround
 * @param padding space padding arround trimed canvas, default to 0 px
 * @returns Return the passed canvas has been trimed
 */
export default function trimCanvas(
	canvas: HTMLCanvasElement,
	padding: number = 0
): HTMLCanvasElement {
	const context = canvas.getContext('2d') as CanvasRenderingContext2D

	const imgWidth = canvas.width
	const imgHeight = canvas.height

	const imgData = context.getImageData(0, 0, imgWidth, imgHeight)
		.data as Uint8ClampedArray

	// get the corners of the relevant content (everything that's not white)
	const cropTop = scanY(true, imgWidth, imgHeight, imgData) - padding
	const cropBottom = scanY(false, imgWidth, imgHeight, imgData) + padding
	const cropLeft = scanX(true, imgWidth, imgHeight, imgData) - padding
	const cropRight = scanX(false, imgWidth, imgHeight, imgData) + padding

	// + 1 is needed because this is a difference, there are n + 1 pixels in
	// between the two numbers inclusive
	const cropXDiff = cropRight - cropLeft + 1
	const cropYDiff = cropBottom - cropTop + 1

	// get the relevant data from the calculated coordinates
	const trimmedData = context.getImageData(
		cropLeft,
		cropTop,
		cropXDiff,
		cropYDiff
	)

	// set the trimmed width and height
	// eslint-disable-next-line no-param-reassign
	canvas.width = cropXDiff

	// eslint-disable-next-line no-param-reassign
	canvas.height = cropYDiff
	// clear the canvas
	context.clearRect(0, 0, cropXDiff, cropYDiff)
	// place the trimmed data into the cleared canvas to create
	// a new, trimmed canvas
	context.putImageData(trimmedData, 0, 0)
	return canvas // for chaining
}
