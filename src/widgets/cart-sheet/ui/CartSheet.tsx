import { CaretDown } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, m as motion } from 'framer-motion'

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
		collapseSummaryLabel,
		compactSummaryLabel,
		compactSummaryTotalLabel,
		discount,
		expandSummaryLabel,
		handleCartCheckoutNavigate,
		handleCartItemNavigate,
		handleCartSummaryToggle,
		handleCartStartShopping,
		handleCartViewNavigate,
		handleCartSheetOpenChange,
		isOpen,
		isSummaryExpanded,
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
				<div className="flex min-h-0 flex-1 flex-col" data-lenis-prevent>
					<div className="flex-1 overflow-y-auto px-8 py-6">
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

					{items.length > 0 ? (
						<div className="mt-auto border-t border-border bg-card/30 px-8 py-6">
							<button
								type="button"
								onClick={handleCartSummaryToggle}
								aria-expanded={isSummaryExpanded}
								aria-label={
									isSummaryExpanded ? collapseSummaryLabel : expandSummaryLabel
								}
								className="flex w-full items-center justify-between border border-border bg-background px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-widest"
							>
								<div className="flex items-center gap-2">
									<span>{compactSummaryLabel}</span>
									<div className="h-1 w-1 bg-border" />
									<span>{compactSummaryTotalLabel}</span>
								</div>
								<CaretDown
									size={14}
									className={cn(
										'text-primary transition-transform duration-300',
										isSummaryExpanded ? 'rotate-180' : 'rotate-0',
									)}
								/>
							</button>

							<AnimatePresence initial={false}>
								{isSummaryExpanded ? (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
										className="overflow-hidden"
									>
										<div className="pt-4">
											<CartSummary
												discount={discount}
												rewardSnapshot={rewardSnapshot}
												subtotal={subtotal}
												tax={tax}
												total={total}
											/>
										</div>
									</motion.div>
								) : null}
							</AnimatePresence>
						</div>
					) : null}
				</div>

				<div className="border-t border-border p-8 bg-card/30">
					{items.length > 0 ? (
						<div className="space-y-3">
							<Button
								type="button"
								onClick={handleCartCheckoutNavigate}
								className="h-11 w-full rounded-none font-mono text-[10px] uppercase tracking-widest"
							>
								{CART.CHECKOUT_SHEET_LABEL}
							</Button>

							<Button
								type="button"
								variant="outline"
								onClick={handleCartViewNavigate}
								className="h-12 w-full font-mono text-[10px] uppercase tracking-widest border-2 hover:bg-background"
							>
								{CART.VIEW_CART_LABEL}
							</Button>
						</div>
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
