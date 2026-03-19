import type { FormEvent } from 'react'

import { CART } from '@/entities/cart'
import {
	Alert,
	AlertDescription,
	AlertTitle,
	Card,
	CardContent,
	Skeleton,
} from '@/shared/ui'

import { CHECKOUT_PAGE } from '../config/constants'
import { CheckoutForm } from './CheckoutForm'
import { CheckoutShell, CheckoutShellContent } from './CheckoutShell'

export function CheckoutPending() {
	const handleCheckoutPendingSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
	}

	return (
		<CheckoutShell
			header={
				<>
					<div className="flex items-center gap-4">
						<Skeleton className="h-px w-8" />
						<Skeleton className="h-3 w-64" />
					</div>
					<Skeleton className="h-14 w-72 md:h-20 md:w-full md:max-w-xl" />
					<Skeleton className="h-4 w-full max-w-xl" />
				</>
			}
		>
			<CheckoutForm handleCheckoutFormSubmit={handleCheckoutPendingSubmit}>
				<CheckoutShellContent
					main={
						<Card className="border border-border py-0 ring-0">
							<CardContent className="p-5">
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-1.5 md:col-span-2">
										<Skeleton className="h-3 w-24" />
										<Skeleton className="h-8 w-full" />
									</div>

									<div className="space-y-1.5 md:col-span-2">
										<Skeleton className="h-3 w-20" />
										<Skeleton className="h-8 w-full" />
									</div>

									<div className="space-y-1.5 md:col-span-2">
										<Skeleton className="h-3 w-24" />
										<Skeleton className="h-8 w-full" />
									</div>

									<div className="space-y-1.5">
										<Skeleton className="h-3 w-16" />
										<Skeleton className="h-8 w-full" />
									</div>

									<div className="space-y-1.5">
										<Skeleton className="h-3 w-24" />
										<Skeleton className="h-8 w-full" />
									</div>

									<div className="space-y-1.5 md:col-span-2">
										<Skeleton className="h-3 w-20" />
										<Skeleton className="h-8 w-full" />
									</div>
								</div>
							</CardContent>
						</Card>
					}
					aside={
						<>
							<Card className="border border-border py-0 ring-0">
								<CardContent className="p-8">
									<h2 className="mb-8 font-mono text-[11px] font-black uppercase tracking-[0.3em] text-primary">
										{CHECKOUT_PAGE.REVIEW_ARCHIVE_LABEL}
									</h2>

									<Card className="border border-border py-0 ring-0">
										<CardContent className="space-y-4 p-4">
											<h2 className="font-mono text-xs font-bold uppercase tracking-widest">
												{CART.SUMMARY.ORDER_LABEL}
											</h2>

											<div className="space-y-2 font-mono text-xs">
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground">
														{CART.SUMMARY.SUBTOTAL_LABEL}
													</span>
													<Skeleton className="h-3 w-16" />
												</div>
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground">
														{CART.SUMMARY.SHIPPING_LABEL}
													</span>
													<Skeleton className="h-3 w-16" />
												</div>
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground">
														{CART.SUMMARY.TAX_LABEL}
													</span>
													<Skeleton className="h-3 w-16" />
												</div>
												<div className="flex items-center justify-between text-primary">
													<span>{CART.SUMMARY.REWARD_LABEL}</span>
													<Skeleton className="h-3 w-16" />
												</div>
												<div className="flex items-center justify-between border-t border-border pt-2 font-bold">
													<span>{CART.SUMMARY.TOTAL_LABEL}</span>
													<Skeleton className="h-3 w-16" />
												</div>
											</div>

											<div className="space-y-2 border border-border bg-muted/40 p-2">
												<Skeleton className="h-3 w-2/3" />
												<Skeleton className="h-3 w-5/6" />
												<Skeleton className="h-1.5 w-full" />
											</div>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							<div className="space-y-6">
								<Alert className="border-primary/35 bg-primary/5">
									<Skeleton className="h-4 w-4" />
									<AlertTitle>
										<Skeleton className="h-4 w-48" />
									</AlertTitle>
									<AlertDescription>
										<Skeleton className="h-4 w-full" />

										<dl className="mt-4 space-y-2 border-t border-primary/20 pt-3">
											{CHECKOUT_PAGE.DEMO_PAYMENT_ALERT.FIELDS.map((field) => (
												<div
													key={field.label}
													className="grid grid-cols-[88px_1fr] gap-2"
												>
													<Skeleton className="h-3 w-full" />
													<Skeleton className="h-3 w-full" />
												</div>
											))}
										</dl>
									</AlertDescription>
								</Alert>

								<div className="space-y-2">
									<Skeleton className="h-11 w-full" />
								</div>
								<Skeleton className="h-12 w-full" />
							</div>

							<Card className="border border-border/50 bg-secondary/5 py-0 ring-0">
								<CardContent className="flex flex-col gap-3 p-5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground opacity-70">
									<div className="flex items-center justify-between">
										<Skeleton className="h-3 w-24" />
										<Skeleton className="h-3 w-28" />
									</div>
									<div className="flex items-center justify-between">
										<Skeleton className="h-3 w-24" />
										<Skeleton className="h-3 w-28" />
									</div>
								</CardContent>
							</Card>
						</>
					}
				/>
			</CheckoutForm>
		</CheckoutShell>
	)
}
