import type { Button as ButtonPrimitive } from '@base-ui/react/button'
import type { VariantProps } from 'class-variance-authority'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Button, type buttonVariants } from './button'

export interface MagneticButtonProps
	extends ButtonPrimitive.Props,
		VariantProps<typeof buttonVariants> {
	children: React.ReactNode
}

export function MagneticButton({ children, ...props }: MagneticButtonProps) {
	const ref = useRef<HTMLButtonElement>(null)
	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const springX = useSpring(x, { stiffness: 150, damping: 15 })
	const springY = useSpring(y, { stiffness: 150, damping: 15 })

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!ref.current) return
		const rect = ref.current.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2
		const distanceX = e.clientX - centerX
		const distanceY = e.clientY - centerY

		x.set(distanceX * 0.35)
		y.set(distanceY * 0.35)
	}

	const handleMouseLeave = () => {
		x.set(0)
		y.set(0)
	}

	return (
		<motion.div
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				x: springX,
				y: springY,
			}}
		>
			<Button ref={ref} {...props}>
				{children}
			</Button>
		</motion.div>
	)
}
