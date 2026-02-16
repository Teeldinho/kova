import { CartSummary } from '@/entities/cart'
import {
	CHECKOUT_FORM,
	CheckoutFields,
	CheckoutForm,
	CheckoutSubmitButton,
} from '@/features/checkout'
import { Button } from '@/shared/ui'

import { CHECKOUT_PAGE } from '../config/constants'
import { useCheckoutPage } from '../model/useCheckoutPage'

export function CheckoutPage() {
	const {
		handleCheckoutBackToCart,
		handleCheckoutPageSubmit,
		form,
		isCartEmpty,
		isStripeCheckoutPending,
		isSubmitDisabled,
		stripeCheckoutError,
		subtotal,
		tax,
		total,
	} = useCheckoutPage()

	if (isCartEmpty) {
		return (
			<div className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
				<h1 className="font-mono text-xl font-bold uppercase tracking-wider">
					{CHECKOUT_FORM.TITLE}
				</h1>
				<p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
					{CHECKOUT_PAGE.EMPTY_CART_MESSAGE}
				</p>
				<Button
					type="button"
					onClick={handleCheckoutBackToCart}
					className="rounded-none font-mono text-[10px] uppercase tracking-widest"
				>
					{CHECKOUT_PAGE.BACK_TO_CART_LABEL}
				</Button>
			</div>
		)
	}

	return (
		<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 md:px-6 md:py-10">
			<header className="space-y-2">
				<h1 className="font-mono text-xl font-bold uppercase tracking-wider md:text-2xl">
					{CHECKOUT_FORM.TITLE}
				</h1>
				<p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
					{CHECKOUT_FORM.DESCRIPTION}
				</p>
			</header>

			{stripeCheckoutError ? (
				<p
					role="alert"
					className="border border-destructive bg-destructive/10 px-3 py-2 font-mono text-xs uppercase tracking-widest text-destructive"
				>
					{stripeCheckoutError}
				</p>
			) : null}

			<CheckoutForm handleCheckoutFormSubmit={handleCheckoutPageSubmit}>
				<CheckoutFields form={form} />

				<aside className="space-y-4">
					<h2 className="font-mono text-xs font-bold uppercase tracking-widest">
						{CHECKOUT_FORM.SUMMARY_TITLE}
					</h2>
					<CartSummary subtotal={subtotal} tax={tax} total={total} />
					<CheckoutSubmitButton
						disabled={isSubmitDisabled}
						isPending={isStripeCheckoutPending}
					/>
					<Button
						type="button"
						variant="outline"
						onClick={handleCheckoutBackToCart}
						className="h-11 w-full rounded-none font-mono text-[10px] uppercase tracking-widest"
					>
						{CHECKOUT_PAGE.BACK_TO_CART_LABEL}
					</Button>
				</aside>
			</CheckoutForm>
		</div>
	)
}
