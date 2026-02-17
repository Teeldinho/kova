import { CartItem, CartSummary } from '@/entities/cart'
import { Button } from '@/shared/ui'

import { CART_PAGE } from '../config/constants'
import { useCartPage } from '../model/useCartPage'

export function CartPage() {
	const {
		cartItems,
		discount,
		handleCartCheckoutNavigate,
		handleCartContinueShopping,
		isCartEmpty,
		rewardSnapshot,
		subtotal,
		tax,
		total,
	} = useCartPage()

	if (isCartEmpty) {
		return (
			<div className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
				<h1 className="font-mono text-xl font-bold uppercase tracking-wider">
					{CART_PAGE.TITLE}
				</h1>
				<p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
					{CART_PAGE.EMPTY_MESSAGE}
				</p>
				<Button
					type="button"
					onClick={handleCartContinueShopping}
					className="rounded-none font-mono text-[10px] uppercase tracking-widest"
				>
					{CART_PAGE.CONTINUE_SHOPPING_LABEL}
				</Button>
			</div>
		)
	}

	return (
		<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 md:px-6 md:py-10">
			<h1 className="font-mono text-xl font-bold uppercase tracking-wider md:text-2xl">
				{CART_PAGE.TITLE}
			</h1>

			<div className="grid gap-6 lg:grid-cols-[1fr_320px]">
				<section className="border border-border bg-card px-5">
					{cartItems.map((cartItem) => (
						<CartItem
							key={`cart-page-item-${cartItem.item.product.id}`}
							item={cartItem.item}
							handleCartItemIncrease={cartItem.handleCartItemIncrease}
							handleCartItemDecrease={cartItem.handleCartItemDecrease}
							handleCartItemRemove={cartItem.handleCartItemRemove}
						/>
					))}
				</section>

				<CartSummary
					discount={discount}
					rewardSnapshot={rewardSnapshot}
					subtotal={subtotal}
					tax={tax}
					total={total}
					handleCheckoutStart={handleCartCheckoutNavigate}
					checkoutLabel={CART_PAGE.CHECKOUT_LABEL}
				/>
			</div>
		</div>
	)
}
