export enum ImageTypes {
	PNG = 'image/png',
	GPEG = 'image/jpeg',
	SVG = 'image/svg+xml',
}
export interface FromDataUrlOptions {
	ratio?: number
	width?: number
	height?: number
	xOffset?: number
	yOffset?: number
}

export const Events = {
	RESIZE: 'resize',
}
