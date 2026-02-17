import { ShoppingCart } from '@phosphor-icons/react'

import type { Product } from '@/entities/product'
import { Button } from '@/shared/ui'

import { QUICK_ADD } from '../config/constants'
import { useQuickAddToCart } from '../model/useQuickAddToCart'

interface QuickAddToCartButtonProps {
	product: Product
}

export function QuickAddToCartButton({ product }: QuickAddToCartButtonProps) {
	const { handleProductQuickAddButtonClick } = useQuickAddToCart()

	return (
		<Button
			variant="default"
			size="sm"
			className="absolute right-2 bottom-2 z-20 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100"
			onClick={handleProductQuickAddButtonClick(product)}
			aria-label={`${QUICK_ADD.BUTTON_ARIA_PREFIX} ${product.title}`}
		>
			<ShoppingCart weight="bold" className="mr-1.5 h-3.5 w-3.5" />
			<span className="font-mono text-[10px] uppercase tracking-wider">
				{QUICK_ADD.BUTTON_LABEL}
			</span>
		</Button>
	)
}
