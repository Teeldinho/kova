import { Scan } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { CartSummary } from '@/entities/cart'
import {
	CHECKOUT_FORM,
	CheckoutFields,
	CheckoutForm,
	CheckoutSubmitButton,
} from '@/features/checkout'
import { Button, Card, CardContent, EmptyState, Magnetic } from '@/shared/ui'

import { CHECKOUT_PAGE } from '../config/constants'
import { useCheckoutPage } from '../model/useCheckoutPage'

export function CheckoutPage() {
	const {
		discount,
		handleCheckoutBackToCart,
		handleCheckoutPageSubmit,
		form,
		isCartEmpty,
		isStripeCheckoutPending,
		isSubmitDisabled,
		rewardSnapshot,
		stripeCheckoutError,
		subtotal,
		tax,
		total,
	} = useCheckoutPage()

	if (isCartEmpty) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
				<EmptyState
					title={CHECKOUT_FORM.TITLE}
					description={CHECKOUT_PAGE.EMPTY_CART_MESSAGE}
					icon={<Scan size={40} weight="thin" />}
					actionLabel={CHECKOUT_PAGE.BACK_TO_CART_LABEL}
					onAction={handleCheckoutBackToCart}
				/>
			</div>
		)
	}

	return (
		<div className="relative mx-auto max-w-7xl px-4 pt-32 pb-12 md:px-6 md:pt-40 md:pb-20">
			<div className="specimen-grid absolute inset-0 opacity-5 pointer-events-none" />

			<header className="mb-16 space-y-6 border-b border-border pb-12">
				<div className="flex items-center gap-4">
					<div className="h-px w-8 bg-primary" />
					<span className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.4em]">
						Fulfillment Protocol / Checkout
					</span>
				</div>
				<h1 className="font-mono text-5xl font-black uppercase tracking-tighter text-foreground md:text-7xl">
					{CHECKOUT_FORM.TITLE}
				</h1>
				<p className="max-w-xl font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground leading-relaxed opacity-80">
					{CHECKOUT_FORM.DESCRIPTION}
				</p>
			</header>

			{stripeCheckoutError ? (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					role="alert"
					className="mb-12 border border-destructive bg-destructive/5 p-4 font-mono text-xs font-bold uppercase tracking-widest text-destructive"
				>
					System Error: {stripeCheckoutError}
				</motion.div>
			) : null}

			<CheckoutForm handleCheckoutFormSubmit={handleCheckoutPageSubmit}>
				<div className="grid gap-20 lg:grid-cols-[1fr_420px]">
					<div className="space-y-16">
						<CheckoutFields form={form} />
					</div>

					<aside className="space-y-10 lg:sticky lg:top-32">
						<Card className="border border-border py-0 ring-0">
							<CardContent className="p-8">
								<h2 className="mb-8 font-mono text-[11px] font-black uppercase tracking-[0.3em] text-primary">
									Review Archive
								</h2>
								<CartSummary
									discount={discount}
									rewardSnapshot={rewardSnapshot}
									subtotal={subtotal}
									tax={tax}
									total={total}
								/>
							</CardContent>
						</Card>

						<div className="space-y-6">
							<CheckoutSubmitButton
								disabled={isSubmitDisabled}
								isPending={isStripeCheckoutPending}
							/>

							<Magnetic strength={0.2}>
								<Button
									type="button"
									variant="outline"
									onClick={handleCheckoutBackToCart}
									className="h-12 w-full font-mono text-[10px] uppercase tracking-widest border transition-colors hover:border-primary/50"
								>
									{CHECKOUT_PAGE.BACK_TO_CART_LABEL}
								</Button>
							</Magnetic>
						</div>

						<Card className="border border-border/50 bg-secondary/5 py-0 ring-0">
							<CardContent className="flex flex-col gap-3 p-5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground opacity-70">
								<div className="flex items-center justify-between">
									<span>Security Layer</span>
									<span className="flex items-center gap-1.5 font-bold text-emerald-500">
										<div className="h-1 w-1 animate-pulse rounded-full bg-current" />
										AES-256 Verified
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span>Protocol Status</span>
									<span className="font-bold text-foreground">
										Operational_v1.3
									</span>
								</div>
							</CardContent>
						</Card>
					</aside>
				</div>
			</CheckoutForm>
		</div>
	)
}
