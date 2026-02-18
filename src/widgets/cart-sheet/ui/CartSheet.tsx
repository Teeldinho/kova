import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'

import { CART, CartItem, CartSummary } from '@/entities/cart'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import {
	Button,
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
		handleCartItemNavigate,
		handleCartStartShopping,
		handleCartViewNavigate,
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
				className="flex h-full w-full flex-col p-0 border-l border-border bg-background sm:max-w-md"
			>
				<SheetHeader className="relative border-b border-border px-8 py-10 text-left bg-card/30">
					<div className="absolute top-4 left-8 font-mono text-[8px] uppercase tracking-[0.3em] text-primary/60 font-bold">
						Specimen_Archive_v4.0
					</div>
					<SheetTitle className="font-mono text-3xl font-black uppercase tracking-tighter">
						Archive
					</SheetTitle>
					<SheetDescription className="font-mono text-[10px] uppercase tracking-widest leading-relaxed">
						Reviewing selected specimens for protocol validation.
					</SheetDescription>
				</SheetHeader>

				{/*
				 * data-lenis-prevent: Lenis checks for this attribute BEFORE checking
				 * isStopped, so wheel events inside this div skip preventDefault() and
				 * allow native overflow-y scroll to work even while lenis.stop() blocks
				 * background page scroll.
				 */}
				<div className="flex-1 overflow-y-auto px-8 py-6" data-lenis-prevent>
					<AnimatePresence mode="popLayout">
						{items.length === 0 ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex h-full flex-col items-center justify-center gap-8 text-center"
							>
								<div className="h-16 w-16 rounded-full border-2 border-dashed border-border flex items-center justify-center">
									<div className="h-2 w-2 rounded-full bg-border" />
								</div>
								<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
									{CART.EMPTY_LABEL}
								</p>
								<Link
									to={ROUTES.HOME}
									onClick={handleCartStartShopping}
									className={cn(
										buttonVariants({ variant: 'outline' }),
										'font-mono text-[10px] uppercase tracking-widest border-2',
									)}
								>
									{CART.START_SHOPPING_LABEL}
								</Link>
							</motion.div>
						) : (
							<div className="space-y-1">
								{cartItems.map((cartItem, index) => (
									<motion.div
										key={`cart-item-${cartItem.item.product.id}`}
										initial={{ x: 20, opacity: 0 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ x: 20, opacity: 0 }}
										transition={{
											delay: index * 0.05,
											ease: [0.23, 1, 0.32, 1],
										}}
										className="border-b border-border last:border-0"
									>
										<CartItem
											item={cartItem.item}
											handleCartItemIncrease={cartItem.handleCartItemIncrease}
											handleCartItemDecrease={cartItem.handleCartItemDecrease}
											handleCartItemRemove={cartItem.handleCartItemRemove}
											onNavigate={handleCartItemNavigate}
										/>
									</motion.div>
								))}
							</div>
						)}
					</AnimatePresence>
				</div>

				<div className="border-t border-border p-8 bg-card/30">
					<CartSummary
						discount={discount}
						rewardSnapshot={rewardSnapshot}
						subtotal={subtotal}
						tax={tax}
						total={total}
						handleCheckoutStart={handleCartCheckoutNavigate}
						checkoutLabel={CART.CHECKOUT_SHEET_LABEL}
					/>

					{items.length > 0 ? (
						<Button
							type="button"
							variant="outline"
							onClick={handleCartViewNavigate}
							className="mt-4 h-12 w-full font-mono text-[10px] uppercase tracking-widest border-2 hover:bg-background"
						>
							{CART.VIEW_CART_LABEL}
						</Button>
					) : null}

					<div className="mt-6 flex justify-center gap-2">
						<div className="h-1 w-1 bg-border" />
						<div className="h-1 w-1 bg-border" />
						<div className="h-1 w-1 bg-border" />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
