import { motion } from 'framer-motion'

import { ANIMATION, CURSOR } from '@/shared/config'
import { cn } from '@/shared/lib'
import { useCustomCursor } from '@/shared/model'

export function CustomCursor() {
	const { cursorPosition, isHovering, isVisible } = useCustomCursor()

	return (
		<motion.div
			className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-8 w-8 items-center justify-center border border-primary mix-blend-difference md:flex"
			animate={{
				scale: isHovering ? CURSOR.HOVER_SCALE : 1,
				backgroundColor: isHovering ? 'var(--primary)' : 'transparent',
				opacity: isVisible ? 1 : 0,
				x: cursorPosition.x,
				y: cursorPosition.y,
			}}
			transition={{
				opacity: {
					duration: 0.2,
				},
				scale: {
					duration: 0.2,
				},
				backgroundColor: {
					duration: 0.2,
				},
				x: {
					type: 'spring',
					damping: ANIMATION.SPRING_DAMPING,
					stiffness: ANIMATION.SPRING_STIFFNESS,
				},
				y: {
					type: 'spring',
					damping: ANIMATION.SPRING_DAMPING,
					stiffness: ANIMATION.SPRING_STIFFNESS,
				},
			}}
		>
			<div
				className={cn(
					'h-1 w-1 bg-primary',
					isHovering && 'bg-primary-foreground',
				)}
			/>
		</motion.div>
	)
}
