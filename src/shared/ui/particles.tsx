import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ParticlesProps {
	count?: number
	className?: string
}

export function Particles({ count = 20, className = '' }: ParticlesProps) {
	const [particles, setParticles] = useState<
		Array<{ id: number; x: number; y: number; size: number; duration: number }>
	>([])

	useEffect(() => {
		setParticles(
			[...Array(count)].map((_, i) => ({
				id: i,
				x: Math.random() * 100,
				y: Math.random() * 100,
				size: Math.random() * 2 + 1,
				duration: Math.random() * 10 + 10,
			})),
		)
	}, [count])

	return (
		<div
			className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
		>
			{particles.map((p) => (
				<motion.div
					key={p.id}
					className="absolute bg-primary/20"
					style={{
						width: p.size,
						height: p.size,
						left: `${p.x}%`,
						top: `${p.y}%`,
					}}
					animate={{
						y: [0, -100, 0],
						opacity: [0.2, 0.5, 0.2],
					}}
					transition={{
						duration: p.duration,
						repeat: Infinity,
						ease: 'linear',
					}}
				/>
			))}
		</div>
	)
}
