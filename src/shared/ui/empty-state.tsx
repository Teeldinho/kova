import { Target } from '@phosphor-icons/react'
import { m as motion } from 'framer-motion'

import { Button } from './button'

interface EmptyStateProps {
	title: string
	description?: string
	icon?: React.ReactNode
	actionLabel?: string
	onAction?: () => void
}

export function EmptyState({
	title,
	description,
	icon,
	actionLabel,
	onAction,
}: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center border border-dashed border-border bg-card/10 py-24 text-center">
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				className="mb-8 rounded-full border-2 border-primary/20 bg-primary/5 p-6 text-primary"
			>
				{icon || <Target size={40} weight="thin" />}
			</motion.div>

			<h3 className="mb-3 font-mono text-xl font-black uppercase tracking-tighter text-foreground">
				{title}
			</h3>

			{description && (
				<p className="max-w-xs font-mono text-[10px] text-muted-foreground uppercase leading-relaxed tracking-widest">
					{description}
				</p>
			)}

			{actionLabel && onAction && (
				<motion.div
					initial={{ y: 10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3 }}
					className="mt-10"
				>
					<Button variant="outline" size="lg" onClick={onAction}>
						{actionLabel}
					</Button>
				</motion.div>
			)}

			<div className="mt-12 flex gap-3">
				{[...Array(4)].map((_, i) => (
					<div key={i} className="h-[2px] w-6 bg-border/30" />
				))}
			</div>
		</div>
	)
}
