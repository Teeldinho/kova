import { Cpu, HardDrive, Target } from '@phosphor-icons/react'
import { m as motion } from 'framer-motion'

interface MetadataBarProps {
	className?: string
}

export function MetadataBar({ className = '' }: MetadataBarProps) {
	return (
		<div
			className={`hidden items-center gap-6 border-l border-border pl-6 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground lg:flex ${className}`}
		>
			<div className="flex items-center gap-2">
				<Cpu size={10} className="text-primary/60" />
				<span>LATENCY: 14MS</span>
			</div>
			<div className="flex items-center gap-2">
				<HardDrive size={10} className="text-primary/60" />
				<span>STORAGE: SSD_NVME</span>
			</div>
			<div className="flex items-center gap-2">
				<Target size={10} className="text-primary/60" />
				<span>COORD: 34.0522° N, 118.2437° W</span>
			</div>
			<motion.div
				animate={{ opacity: [0.2, 1, 0.2] }}
				transition={{ repeat: Infinity, duration: 2 }}
				className="flex items-center gap-2 text-primary"
			>
				<div className="h-1 w-1 rounded-full bg-current" />
				<span>LIVE_FEED</span>
			</motion.div>
		</div>
	)
}
