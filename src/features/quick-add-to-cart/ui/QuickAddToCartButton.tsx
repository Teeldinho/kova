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
			nativeButton={false}
			render={<span />}
			variant="default"
			size="sm"
			className="absolute right-2 bottom-2 z-20 -translate-y-1 cursor-pointer border-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 hover:bg-primary hover:text-primary-foreground"
			onClick={handleProductQuickAddButtonClick(product)}
			aria-label={`${QUICK_ADD.BUTTON_ARIA_PREFIX} ${product.title}`}
			data-cursor-label="QUICK"
		>
			<ShoppingCart weight="bold" className="mr-1.5 h-3.5 w-3.5" />
			<span className="font-mono text-[9px] font-black uppercase tracking-wider">
				{QUICK_ADD.BUTTON_LABEL}
			</span>
		</Button>
	)
}
