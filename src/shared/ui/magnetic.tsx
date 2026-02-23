import { m as motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

interface MagneticProps {
	children: React.ReactNode
	strength?: number
	className?: string
}

export function Magnetic({
	children,
	strength = 0.35,
	className = '',
}: MagneticProps) {
	const ref = useRef<HTMLDivElement>(null)
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

		x.set(distanceX * strength)
		y.set(distanceY * strength)
	}

	const handleMouseLeave = () => {
		x.set(0)
		y.set(0)
	}

	return (
		<motion.div
			ref={ref}
			className={className}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				x: springX,
				y: springY,
			}}
		>
			{children}
		</motion.div>
	)
}
