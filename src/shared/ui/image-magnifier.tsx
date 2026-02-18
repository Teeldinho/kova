import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/shared/lib'

interface ImageMagnifierProps {
	src: string
	alt: string
	className?: string
	magnifierHeight?: number
	magnifierWidth?: number
	zoomLevel?: number
}

export function ImageMagnifier({
	src,
	alt,
	className = '',
	magnifierHeight = 150,
	magnifierWidth = 150,
	zoomLevel = 2.5,
}: ImageMagnifierProps) {
	const [[x, y], setXY] = useState([0, 0])
	const [[imgWidth, imgHeight], setSize] = useState([0, 0])
	const [showMagnifier, setShowMagnifier] = useState(false)

	return (
		<div
			role="button"
			tabIndex={0}
			className={cn('relative inline-block overflow-hidden', className)}
			onMouseEnter={(e) => {
				const elem = e.currentTarget
				const { width, height } = elem.getBoundingClientRect()
				setSize([width, height])
				setShowMagnifier(true)
			}}
			onMouseMove={(e) => {
				const elem = e.currentTarget
				const { top, left } = elem.getBoundingClientRect()
				const x = e.pageX - left - window.scrollX
				const y = e.pageY - top - window.scrollY
				setXY([x, y])
			}}
			onMouseLeave={() => {
				setShowMagnifier(false)
			}}
		>
			<img src={src} alt={alt} className="h-full w-full object-contain" />

			<AnimatePresence>
				{showMagnifier && (
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						className="pointer-events-none absolute border-2 border-primary bg-background shadow-2xl"
						style={{
							height: `${magnifierHeight}px`,
							width: `${magnifierWidth}px`,
							top: `${y - magnifierHeight / 2}px`,
							left: `${x - magnifierWidth / 2}px`,
							backgroundImage: `url('${src}')`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: `${imgWidth * zoomLevel}px ${
								imgHeight * zoomLevel
							}px`,
							backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
							backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
						}}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}
