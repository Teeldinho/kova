import { ShoppingCart } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { CartItem, CartSummary } from '@/entities/cart'
import { Button, EmptyState, Magnetic } from '@/shared/ui'

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
			<div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
				<EmptyState
					title={CART_PAGE.TITLE}
					description={CART_PAGE.EMPTY_MESSAGE}
					icon={<ShoppingCart size={40} weight="thin" />}
					actionLabel={CART_PAGE.CONTINUE_SHOPPING_LABEL}
					onAction={handleCartContinueShopping}
				/>
			</div>
		)
	}

	return (
		<div className="relative mx-auto max-w-7xl space-y-10 px-4 pt-32 pb-12 md:px-6 md:pt-40 md:pb-20">
			<div className="specimen-grid absolute inset-0 pointer-events-none opacity-5" />

			<header className="relative flex flex-col gap-6 border-b border-border pb-12">
				<div className="flex items-center gap-4">
					<div className="h-px w-8 bg-primary" />
					<span className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.4em]">
						Review Archive / {cartItems.length} Specimens
					</span>
				</div>
				<h1 className="font-mono text-5xl font-black uppercase tracking-tighter text-foreground md:text-7xl">
					{CART_PAGE.TITLE}
				</h1>
			</header>

			<div className="grid gap-16 lg:grid-cols-[1fr_380px] lg:items-start">
				<section className="relative space-y-6">
					{cartItems.map((cartItem, index) => (
						<motion.div
							key={`cart-page-item-${cartItem.item.product.id}`}
							initial={{ y: 20, opacity: 0 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
							className="group relative border border-border bg-card p-4 transition-all hover:border-primary/30"
						>
							<CartItem
								item={cartItem.item}
								handleCartItemIncrease={cartItem.handleCartItemIncrease}
								handleCartItemDecrease={cartItem.handleCartItemDecrease}
								handleCartItemRemove={cartItem.handleCartItemRemove}
							/>
						</motion.div>
					))}
				</section>

				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className="sticky top-24"
				>
					<div className="mb-4 border-l-4 border-primary bg-primary/5 p-4 font-mono text-[10px] uppercase tracking-widest text-primary">
						Note: All specimens are subject to standard registry validation
						protocols.
					</div>

					<CartSummary
						discount={discount}
						rewardSnapshot={rewardSnapshot}
						subtotal={subtotal}
						tax={tax}
						total={total}
						handleCheckoutStart={handleCartCheckoutNavigate}
						checkoutLabel={CART_PAGE.CHECKOUT_LABEL}
					/>

					<div className="mt-6 flex justify-center">
						<Magnetic strength={0.2}>
							<Button
								variant="ghost"
								className="font-mono text-[9px] uppercase tracking-widest opacity-60 hover:opacity-100"
								onClick={handleCartContinueShopping}
							>
								{CART_PAGE.CONTINUE_SHOPPING_LABEL}
							</Button>
						</Magnetic>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
