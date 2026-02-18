import { Minus, Plus } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Button } from './button'

interface QuantitySelectorProps {
	value: number
	onChange: (value: number) => void
	min?: number
	max?: number
	className?: string
}

export function QuantitySelector({
	value,
	onChange,
	min = 1,
	max = 99,
	className = '',
}: QuantitySelectorProps) {
	const decrement = () => onChange(Math.max(min, value - 1))
	const increment = () => onChange(Math.min(max, value + 1))

	return (
		<div className={`flex items-center bg-background ${className}`}>
			<Button
				id="quantity-selector"
				variant="outline"
				size="icon-sm"
				onClick={decrement}
				disabled={value <= min}
				className="h-10 w-10 rounded-none border-2 border-r-0 border-border hover:bg-primary hover:text-background hover:border-primary"
			>
				<Minus size={14} weight="bold" />
			</Button>

			<div className="flex h-10 w-16 items-center justify-center border-y-2 border-border bg-background">
				<motion.span
					key={value}
					initial={{ y: 5, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className="font-mono text-sm font-bold text-foreground"
				>
					{value.toString().padStart(2, '0')}
				</motion.span>
			</div>

			<Button
				variant="outline"
				size="icon-sm"
				onClick={increment}
				disabled={value >= max}
				className="h-10 w-10 rounded-none border-2 border-l-0 border-border hover:bg-primary hover:text-background hover:border-primary"
			>
				<Plus size={14} weight="bold" />
			</Button>
		</div>
	)
}
