import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

import { ANIMATION } from '@/shared/config'

export function CustomCursor() {
	const [isHovering, setIsHovering] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)

	const cursorX = useSpring(mouseX, {
		damping: ANIMATION.SPRING_DAMPING,
		stiffness: ANIMATION.SPRING_STIFFNESS,
	})
	const cursorY = useSpring(mouseY, {
		damping: ANIMATION.SPRING_DAMPING,
		stiffness: ANIMATION.SPRING_STIFFNESS,
	})

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX - 16)
			mouseY.set(e.clientY - 16)
			setIsVisible(true)
		}

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			setIsHovering(
				!!target.closest('button, a, [role="button"], input, select'),
			)
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
	}, [mouseX, mouseY])

	return (
		<motion.div
			className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-8 w-8 items-center justify-center border border-primary mix-blend-difference md:flex"
			style={{ x: cursorX, y: cursorY }}
			animate={{
				scale: isHovering ? 2.5 : 1,
				backgroundColor: isHovering ? 'var(--primary)' : 'transparent',
				opacity: isVisible ? 1 : 0,
			}}
			transition={{ duration: 0.2 }}
		>
			<div
				className={`h-1 w-1 bg-primary ${isHovering ? 'bg-primary-foreground' : ''}`}
			/>
		</motion.div>
	)
}
