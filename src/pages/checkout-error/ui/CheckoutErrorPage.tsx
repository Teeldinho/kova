import { Warning } from '@phosphor-icons/react'
import { m as motion } from 'framer-motion'

import { Button, Card, CardContent } from '@/shared/ui'

import { CHECKOUT_ERROR } from '../config/constants'
import { useCheckoutErrorPage } from '../model/useCheckoutErrorPage'

interface CheckoutErrorPageProps {
	reason?: string
}

export function CheckoutErrorPage({ reason }: CheckoutErrorPageProps) {
	const { errorReason, handleCheckoutErrorHome, handleCheckoutErrorRetry } =
		useCheckoutErrorPage({ reason })

	return (
		<div className="relative min-h-dvh pt-32 md:pt-40">
			<div className="specimen-grid pointer-events-none fixed inset-0 hidden opacity-10 md:block" />

			<div className="relative mx-auto flex max-w-3xl flex-col items-center justify-center gap-10 px-4 text-center">
				<motion.div
					initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
					animate={{ rotate: 0, scale: 1, opacity: 1 }}
					className="rounded-none border-4 border-destructive/20 bg-destructive/5 p-8 text-destructive shadow-[0_0_40px_rgba(239,68,68,0.15)]"
				>
					<Warning size={64} weight="bold" />
				</motion.div>

				<div className="space-y-4">
					<motion.h1
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className="font-mono text-4xl font-black uppercase tracking-tighter text-foreground md:text-6xl"
					>
						{CHECKOUT_ERROR.TITLE}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="max-w-xl font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-destructive"
					>
						Protocol_Failure_v1.3 {'//'} Transaction_Aborted
					</motion.p>
				</div>

				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ opacity: 1, y: 0 }}
					className="w-full max-w-xl"
				>
					<Card className="border-2 border-destructive/30 py-0 ring-0">
						<CardContent className="space-y-6 p-8">
							<div className="flex items-center gap-4 border-b border-border pb-4">
								<div className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
								<span className="font-mono text-[10px] font-black uppercase tracking-widest text-muted-foreground">
									Error Diagnostics
								</span>
							</div>

							<p className="font-mono text-xs leading-relaxed tracking-widest text-foreground uppercase">
								{errorReason}
							</p>
						</CardContent>
					</Card>
				</motion.div>

				<div className="flex w-full max-w-xl flex-col gap-4 md:flex-row">
					<Button
						type="button"
						size="lg"
						onClick={handleCheckoutErrorRetry}
						className="h-14 flex-1 border-2 font-mono text-[11px] font-black uppercase tracking-widest"
					>
						{CHECKOUT_ERROR.RETRY_LABEL}
					</Button>
					<Button
						type="button"
						variant="outline"
						size="lg"
						onClick={handleCheckoutErrorHome}
						className="h-14 flex-1 border-2 font-mono text-[11px] font-black uppercase tracking-widest"
					>
						{CHECKOUT_ERROR.HOME_LABEL}
					</Button>
				</div>
			</div>
		</div>
	)
}
