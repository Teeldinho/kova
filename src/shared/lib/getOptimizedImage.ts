import { IMAGE } from '@/shared/config'

interface GetOptimizedImageUrlOptions {
	width?: number
	quality?: number
	format?: string
}

const isExternalImageSource = (source: string) =>
	source.startsWith('https://') || source.startsWith('http://')

const toWsrvSource = (source: string) => {
	const parsedUrl = new URL(source)
	return `${parsedUrl.host}${parsedUrl.pathname}${parsedUrl.search}`
}

export function getOptimizedImageUrl(
	source: string,
	options: GetOptimizedImageUrlOptions = {},
) {
	if (!isExternalImageSource(source)) {
		return source
	}

	const {
		width,
		quality = IMAGE.DEFAULT_QUALITY,
		format = IMAGE.DEFAULT_FORMAT,
	} = options
	const optimizedUrl = new URL(IMAGE.CDN_BASE_URL)

	optimizedUrl.searchParams.set('url', toWsrvSource(source))
	optimizedUrl.searchParams.set('q', String(quality))
	optimizedUrl.searchParams.set('output', format)

	if (width) {
		optimizedUrl.searchParams.set('w', String(width))
	}

	return optimizedUrl.toString()
}

export function getOptimizedImageSrcSet(
	source: string,
	widths: readonly number[],
) {
	if (!isExternalImageSource(source)) {
		return undefined
	}

	return widths
		.map(
			(width) =>
				`${getOptimizedImageUrl(source, {
					width,
				})} ${width}w`,
		)
		.join(', ')
}
