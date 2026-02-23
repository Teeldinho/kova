import { m as motion, useSpring, useTransform } from 'framer-motion'

import { cn } from '@/shared/lib'
import { useCustomCursor } from '@/shared/model'

export function CustomCursor() {
	const {
		cursorX,
		cursorY,
		isHovering,
		isVisible,
		hoverLabel,
		motionIntensity,
	} = useCustomCursor()

	const smoothCursorX = useSpring(cursorX, { damping: 40, stiffness: 500 })
	const smoothCursorY = useSpring(cursorY, { damping: 40, stiffness: 500 })

	const idleScale = useTransform(motionIntensity, (value) => 1 + value * 0.25)
	const idleRotate = useTransform(motionIntensity, (value) => value * 12)
	const ringScale = useTransform(motionIntensity, (value) => 1 + value * 0.32)
	const ringOpacity = useTransform(
		motionIntensity,
		(value) => 0.1 + value * 0.28,
	)

	return (
		<motion.div
			className="pointer-events-none fixed top-0 left-0 z-[9999] hidden items-center justify-center mix-blend-difference md:flex"
			animate={{
				width: isHovering ? (hoverLabel ? 80 : 48) : 24,
				height: isHovering ? (hoverLabel ? 32 : 48) : 24,
				borderRadius: isHovering && !hoverLabel ? '50%' : '0%',
				opacity: isVisible ? 1 : 0,
				backgroundColor: isHovering ? 'var(--primary)' : 'transparent',
				borderWidth: isHovering ? 0 : 1,
				borderColor: 'var(--primary)',
			}}
			style={{
				x: smoothCursorX,
				y: smoothCursorY,
				scale: isHovering ? 1 : idleScale,
				rotate: isHovering ? 0 : idleRotate,
			}}
			transition={{
				opacity: { duration: 0.2 },
				width: { type: 'spring', damping: 40, stiffness: 500 },
				height: { type: 'spring', damping: 40, stiffness: 500 },
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
					opacity: isHovering ? 0.12 : undefined,
					scale: isHovering ? 1 : undefined,
				}}
				style={
					isHovering
						? undefined
						: {
								opacity: ringOpacity,
								scale: ringScale,
							}
				}
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
