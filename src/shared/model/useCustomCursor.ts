import { useEffect, useRef, useState } from 'react'

import { CURSOR } from '@/shared/config'

interface CursorPosition {
	x: number
	y: number
}

const INITIAL_CURSOR_POSITION: CursorPosition = {
	x: 0,
	y: 0,
}

export function useCustomCursor() {
	const [cursorPosition, setCursorPosition] = useState(INITIAL_CURSOR_POSITION)
	const [isHovering, setIsHovering] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [hoverLabel, setHoverLabel] = useState<string | null>(null)
	const [motionIntensity, setMotionIntensity] = useState(0)
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

				setMotionIntensity(Math.min(velocity * 0.8, 1))
			}

			previousMouseRef.current = {
				x: event.clientX,
				y: event.clientY,
				timestamp,
			}

			setCursorPosition({
				x: event.clientX - CURSOR.OFFSET,
				y: event.clientY - CURSOR.OFFSET,
			})
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
			} else {
				setIsHovering(false)
				setHoverLabel(null)
			}
		}

		const handleMouseLeave = () => {
			setIsVisible(false)
			setMotionIntensity(0)
		}

		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseover', handleMouseOver)
		document.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseover', handleMouseOver)
			document.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [])

	return {
		cursorPosition,
		isHovering,
		isVisible,
		hoverLabel,
		motionIntensity,
	}
}
