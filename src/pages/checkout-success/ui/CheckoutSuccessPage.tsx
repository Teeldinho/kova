import { ShieldCheck } from '@phosphor-icons/react'
import { m as motion } from 'framer-motion'

import { Button, Card, CardContent, Particles } from '@/shared/ui'

import { CHECKOUT_SUCCESS } from '../config/constants'
import { useCheckoutSuccessPage } from '../model/useCheckoutSuccessPage'

interface CheckoutSuccessPageProps {
	sessionId?: string
}

export function CheckoutSuccessPage({ sessionId }: CheckoutSuccessPageProps) {
	const { handleCheckoutSuccessContinue, orderDetails } =
		useCheckoutSuccessPage({ sessionId })

	return (
		<div className="relative min-h-dvh pt-32 md:pt-40">
			<div className="specimen-grid pointer-events-none fixed inset-0 hidden opacity-10 md:block" />
			<Particles className="fixed inset-0 hidden md:block" count={28} />

			<div className="relative mx-auto flex max-w-3xl flex-col items-center justify-center gap-10 px-4 text-center">
				<motion.div
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ type: 'spring', damping: 15 }}
					className="rounded-full border-4 border-emerald-500/20 bg-emerald-500/5 p-8 text-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
				>
					<ShieldCheck size={64} weight="bold" />
				</motion.div>

				<div className="space-y-4">
					<motion.h1
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="font-mono text-4xl font-black uppercase tracking-tighter text-foreground md:text-6xl"
					>
						{CHECKOUT_SUCCESS.TITLE}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="max-w-xl font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary"
					>
						Registry_Validation_Successful {'//'} Protocol_v1.3_Complete
					</motion.p>
				</div>

				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="w-full max-w-md"
				>
					<Card className="border-2 border-border py-0 shadow-2xl ring-0">
						<CardContent className="space-y-6 p-8">
							<div className="flex items-center gap-4 border-b border-border pb-4">
								<div className="h-2 w-2 rounded-full bg-emerald-500" />
								<span className="font-mono text-[10px] font-black uppercase tracking-widest text-muted-foreground">
									Order Metadata
								</span>
							</div>

							<dl className="space-y-4">
								{orderDetails.map((detail) => (
									<div
										key={detail.label}
										className="flex justify-between border-b border-border/30 pb-2 last:border-0"
									>
										<dt className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
											{detail.label}
										</dt>
										<dd className="font-mono text-[10px] font-black uppercase tracking-tighter text-foreground">
											{detail.value}
										</dd>
									</div>
								))}
							</dl>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1 }}
				>
					<Button
						type="button"
						size="lg"
						onClick={handleCheckoutSuccessContinue}
						className="h-14 min-w-[240px] border-2 font-mono text-[11px] font-black uppercase tracking-widest"
					>
						{CHECKOUT_SUCCESS.CONTINUE_LABEL}
					</Button>
				</motion.div>
			</div>
		</div>
	)
}
