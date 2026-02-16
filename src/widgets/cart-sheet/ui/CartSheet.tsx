import { Link } from '@tanstack/react-router'

import { CartItem, CartSummary, useCart } from '@/entities/cart'
import { cn } from '@/shared/lib/cn'
import { useCartSheet } from '@/shared/model'
import { buttonVariants } from '@/shared/ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/shared/ui/sheet'

export function CartSheet() {
	const {
		items,
		subtotal,
		tax,
		total,
		handleCartItemQuantityUpdate,
		handleCartItemRemove,
	} = useCart()
	const { isOpen, handleCartSheetOpenChange, handleCartSheetClose } =
		useCartSheet()

	const handleStartShopping = () => {
		handleCartSheetClose()
	}

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
								Your cart is empty
							</p>
							<Link
								to="/"
								onClick={handleStartShopping}
								className={cn(
									buttonVariants({ variant: 'default' }),
									'rounded-none font-mono text-[10px] uppercase tracking-widest',
								)}
							>
								Start Shopping
							</Link>
						</div>
					) : (
						items.map((item) => (
							<CartItem
								key={`cart-item-${item.product.id}`}
								item={item}
								handleCartItemIncrease={() =>
									handleCartItemQuantityUpdate(
										item.product.id,
										item.quantity + 1,
									)
								}
								handleCartItemDecrease={() =>
									handleCartItemQuantityUpdate(
										item.product.id,
										item.quantity - 1,
									)
								}
								handleCartItemRemove={() =>
									handleCartItemRemove(item.product.id)
								}
							/>
						))
					)}
				</div>

				<div className="border-t border-border p-6">
					<CartSummary
						subtotal={subtotal}
						tax={tax}
						total={total}
						checkoutLabel="Go To Checkout"
					/>
				</div>
			</SheetContent>
		</Sheet>
	)
}
