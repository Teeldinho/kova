import { Link } from '@tanstack/react-router'

import { CART, CartItem, CartSummary } from '@/entities/cart'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import {
	buttonVariants,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/shared/ui'

import { useCartSheetWidget } from '../model/useCartSheetWidget'

export function CartSheet() {
	const {
		cartItems,
		discount,
		handleCartCheckoutNavigate,
		handleCartStartShopping,
		handleCartSheetOpenChange,
		isOpen,
		items,
		rewardSnapshot,
		subtotal,
		tax,
		total,
	} = useCartSheetWidget()

	return (
		<Sheet open={isOpen} onOpenChange={handleCartSheetOpenChange}>
			<SheetContent
				side="right"
				className="flex h-full w-full flex-col p-0 sm:max-w-md"
			>
				<SheetHeader className="border-b border-border px-6 py-4">
					<SheetTitle>Cart</SheetTitle>
					<SheetDescription>
						Review and update your selected items.
					</SheetDescription>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto px-6">
					{items.length === 0 ? (
						<div className="flex h-full flex-col items-center justify-center gap-4 text-center">
							<p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
								{CART.EMPTY_LABEL}
							</p>
							<Link
								to={ROUTES.HOME}
								onClick={handleCartStartShopping}
								className={cn(
									buttonVariants({ variant: 'default' }),
									'rounded-none font-mono text-[10px] uppercase tracking-widest',
								)}
							>
								{CART.START_SHOPPING_LABEL}
							</Link>
						</div>
					) : (
						cartItems.map((cartItem) => (
							<CartItem
								key={`cart-item-${cartItem.item.product.id}`}
								item={cartItem.item}
								handleCartItemIncrease={cartItem.handleCartItemIncrease}
								handleCartItemDecrease={cartItem.handleCartItemDecrease}
								handleCartItemRemove={cartItem.handleCartItemRemove}
							/>
						))
					)}
				</div>

				<div className="border-t border-border p-6">
					<CartSummary
						discount={discount}
						rewardSnapshot={rewardSnapshot}
						subtotal={subtotal}
						tax={tax}
						total={total}
						handleCheckoutStart={handleCartCheckoutNavigate}
						checkoutLabel={CART.CHECKOUT_SHEET_LABEL}
					/>
				</div>
			</SheetContent>
		</Sheet>
	)
}
