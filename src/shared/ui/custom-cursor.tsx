import { motion } from 'framer-motion'
import { cn } from '@/shared/lib'
import { useCustomCursor } from '@/shared/model'

export function CustomCursor() {
	const { cursorPosition, isHovering, isVisible, hoverLabel, motionIntensity } =
		useCustomCursor()
	const idleScale = 1 + motionIntensity * 0.25

	return (
		<motion.div
			className="pointer-events-none fixed top-0 left-0 z-[9999] hidden items-center justify-center mix-blend-difference md:flex"
			animate={{
				width: isHovering ? (hoverLabel ? 80 : 48) : 24,
				height: isHovering ? (hoverLabel ? 32 : 48) : 24,
				borderRadius: isHovering && !hoverLabel ? '50%' : '0%',
				opacity: isVisible ? 1 : 0,
				x: cursorPosition.x,
				y: cursorPosition.y,
				scale: isHovering ? 1 : idleScale,
				rotate: isHovering ? 0 : motionIntensity * 12,
				backgroundColor: isHovering ? 'var(--primary)' : 'transparent',
				borderWidth: isHovering ? 0 : 1,
				borderColor: 'var(--primary)',
				boxShadow: isHovering
					? '0 0 22px oklch(0.58 0.22 280 / 35%)'
					: `0 0 ${8 + motionIntensity * 20}px oklch(0.58 0.22 280 / 16%)`,
			}}
			transition={{
				opacity: { duration: 0.2 },
				width: { type: 'spring', damping: 40, stiffness: 500 },
				height: { type: 'spring', damping: 40, stiffness: 500 },
				x: { type: 'spring', damping: 40, stiffness: 500 },
				y: { type: 'spring', damping: 40, stiffness: 500 },
			}}
		>
			{hoverLabel ? (
				<motion.span
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="font-mono text-[10px] font-bold uppercase tracking-tighter text-background"
				>
					{hoverLabel}
				</motion.span>
			) : (
				<div
					className={cn(
						'h-0.5 w-0.5 bg-primary transition-colors duration-200',
						isHovering && 'bg-background',
					)}
				/>
			)}

			<motion.div
				className="absolute inset-[-9px] border border-primary/35"
				animate={{
					opacity: isHovering ? 0.12 : 0.1 + motionIntensity * 0.28,
					scale: isHovering ? 1 : 1 + motionIntensity * 0.32,
				}}
				transition={{
					opacity: { duration: 0.18 },
					scale: { type: 'spring', damping: 24, stiffness: 280 },
				}}
			/>

			{!isHovering && (
				<>
					<div className="absolute top-0 h-2 w-[1px] bg-primary/40" />
					<div className="absolute bottom-0 h-2 w-[1px] bg-primary/40" />
					<div className="absolute left-0 h-[1px] w-2 bg-primary/40" />
					<div className="absolute right-0 h-[1px] w-2 bg-primary/40" />
				</>
			)}
		</motion.div>
	)
}
