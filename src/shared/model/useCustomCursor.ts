import { useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { CURSOR } from '@/shared/config'

export function useCustomCursor() {
	const cursorX = useMotionValue(0)
	const cursorY = useMotionValue(0)
	const motionIntensity = useMotionValue(0)

	const [isHovering, setIsHovering] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [hoverLabel, setHoverLabel] = useState<string | null>(null)

	const previousMouseRef = useRef<{
		x: number
		y: number
		timestamp: number
	} | null>(null)

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			const timestamp = performance.now()
			const previousMouse = previousMouseRef.current

			if (previousMouse) {
				const deltaX = event.clientX - previousMouse.x
				const deltaY = event.clientY - previousMouse.y
				const elapsedMs = Math.max(timestamp - previousMouse.timestamp, 1)
				const velocity = Math.hypot(deltaX, deltaY) / elapsedMs

				motionIntensity.set(Math.min(velocity * 0.8, 1))
			}

			previousMouseRef.current = {
				x: event.clientX,
				y: event.clientY,
				timestamp,
			}

			cursorX.set(event.clientX - CURSOR.OFFSET)
			cursorY.set(event.clientY - CURSOR.OFFSET)
			setIsVisible(true)
		}

		const handleMouseOver = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			const interactive = target.closest(
				CURSOR.INTERACTIVE_SELECTOR,
			) as HTMLElement

			if (interactive) {
				setIsHovering(true)
				setHoverLabel(interactive.getAttribute('data-cursor-label'))
				return
			}

			setIsHovering(false)
			setHoverLabel(null)
		}

		const handleMouseLeave = () => {
			setIsVisible(false)
			motionIntensity.set(0)
		}

		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseover', handleMouseOver)
		document.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseover', handleMouseOver)
			document.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [cursorX, cursorY, motionIntensity])

	return {
		cursorX,
		cursorY,
		isHovering,
		isVisible,
		hoverLabel,
		motionIntensity,
	}
}
