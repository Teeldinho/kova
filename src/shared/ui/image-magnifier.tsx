import {
	AnimatePresence,
	m as motion,
	useMotionTemplate,
	useMotionValue,
	useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'

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
	const [imgSize, setImgSize] = useState<[number, number]>([0, 0])
	const [showMagnifier, setShowMagnifier] = useState(false)

	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)

	const boundsRef = useRef<DOMRect | null>(null)

	const top = useMotionTemplate`${mouseY}px`
	const left = useMotionTemplate`${mouseX}px`
	const backgroundPositionX = useTransform(
		mouseX,
		(value) => `${-value * zoomLevel + magnifierWidth / 2}px`,
	)
	const backgroundPositionY = useTransform(
		mouseY,
		(value) => `${-value * zoomLevel + magnifierHeight / 2}px`,
	)

	return (
		<div
			role="button"
			tabIndex={0}
			className={cn('relative inline-block overflow-hidden', className)}
			onMouseEnter={(event) => {
				const bounds = event.currentTarget.getBoundingClientRect()
				boundsRef.current = bounds
				setImgSize([bounds.width, bounds.height])
				setShowMagnifier(true)
			}}
			onMouseMove={(event) => {
				const bounds = boundsRef.current

				if (!bounds) {
					return
				}

				mouseX.set(event.clientX - bounds.left)
				mouseY.set(event.clientY - bounds.top)
			}}
			onMouseLeave={() => {
				setShowMagnifier(false)
				boundsRef.current = null
			}}
		>
			<img src={src} alt={alt} className="h-full w-full object-contain" />

			<AnimatePresence>
				{showMagnifier ? (
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						className="pointer-events-none absolute border-2 border-primary bg-background shadow-2xl"
						style={{
							height: `${magnifierHeight}px`,
							width: `${magnifierWidth}px`,
							top,
							left,
							translateX: '-50%',
							translateY: '-50%',
							backgroundImage: `url('${src}')`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: `${imgSize[0] * zoomLevel}px ${imgSize[1] * zoomLevel}px`,
							backgroundPositionX,
							backgroundPositionY,
						}}
					/>
				) : null}
			</AnimatePresence>
		</div>
	)
}
