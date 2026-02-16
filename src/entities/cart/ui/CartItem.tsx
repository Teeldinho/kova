import { Minus, Plus, Trash } from '@phosphor-icons/react'
import { formatPrice } from '@/shared/lib'
import { Button } from '@/shared/ui/button'

import type { CartItem as CartItemType } from '../model/types'

interface CartItemProps {
	item: CartItemType
	handleCartItemIncrease: () => void
	handleCartItemDecrease: () => void
	handleCartItemRemove: () => void
}

export function CartItem({
	item,
	handleCartItemIncrease,
	handleCartItemDecrease,
	handleCartItemRemove,
}: CartItemProps) {
	return (
		<article className="flex gap-4 border-b border-border py-4">
			<div className="h-20 w-20 shrink-0 overflow-hidden border border-border bg-card p-2">
				<img
					src={item.product.image}
					alt={item.product.title}
					className="h-full w-full object-contain"
					loading="lazy"
				/>
			</div>

			<div className="min-w-0 flex-1 space-y-2">
				<h3 className="line-clamp-2 font-mono text-xs font-medium">
					{item.product.title}
				</h3>

				<div className="flex items-center justify-between gap-2">
					<p className="font-mono text-sm font-bold">
						{formatPrice(item.product.price)}
					</p>

					<div className="flex items-center border border-border">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-8 w-8 rounded-none"
							onClick={handleCartItemDecrease}
							aria-label="Decrease quantity"
						>
							<Minus size={14} />
						</Button>
						<span className="w-10 text-center font-mono text-xs font-medium">
							{item.quantity}
						</span>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-8 w-8 rounded-none"
							onClick={handleCartItemIncrease}
							aria-label="Increase quantity"
						>
							<Plus size={14} />
						</Button>
					</div>
				</div>

				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="h-7 px-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:bg-transparent hover:text-destructive"
					onClick={handleCartItemRemove}
				>
					<Trash size={12} className="mr-1" />
					Remove
				</Button>
			</div>
		</article>
	)
}
