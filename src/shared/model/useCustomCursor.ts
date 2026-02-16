import { useEffect, useState } from 'react'

import { CURSOR } from '@/shared/config'

interface CursorPosition {
	x: number
	y: number
}

const INITIAL_CURSOR_POSITION: CursorPosition = {
	x: 0,
	y: 0,
}

const getIsInteractiveTarget = (target: EventTarget | null) => {
	if (!(target instanceof HTMLElement)) {
		return false
	}

	return Boolean(target.closest(CURSOR.INTERACTIVE_SELECTOR))
}

export function useCustomCursor() {
	const [cursorPosition, setCursorPosition] = useState(INITIAL_CURSOR_POSITION)
	const [isHovering, setIsHovering] = useState(false)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setCursorPosition({
				x: event.clientX - CURSOR.OFFSET,
				y: event.clientY - CURSOR.OFFSET,
			})
			setIsVisible(true)
		}

		const handleMouseOver = (event: MouseEvent) => {
			setIsHovering(getIsInteractiveTarget(event.target))
		}

		const handleMouseLeave = () => {
			setIsVisible(false)
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
	}
}
