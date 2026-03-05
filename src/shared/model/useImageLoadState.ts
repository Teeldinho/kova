import { useEffect, useState } from 'react'

export function useImageLoadState(src: string) {
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	useEffect(() => {
		void src
		setIsImageLoaded(false)
	}, [src])

	const handleImageLoad = () => {
		setIsImageLoaded(true)
	}

	const handleImageError = () => {
		setIsImageLoaded(true)
	}

	return {
		handleImageError,
		handleImageLoad,
		isImageLoaded,
	}
}
