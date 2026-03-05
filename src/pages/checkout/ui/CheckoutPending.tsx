import { Skeleton } from '@/shared/ui'

export function CheckoutPending() {
	return (
		<div className="relative mx-auto max-w-7xl px-4 pt-32 pb-12 md:px-6 md:pt-40 md:pb-20">
			<div className="specimen-grid pointer-events-none absolute inset-0 opacity-5" />

			<header className="mb-16 space-y-6 border-b border-border pb-12">
				<div className="flex items-center gap-4">
					<Skeleton className="h-px w-8" />
					<Skeleton className="h-3 w-64" />
				</div>
				<Skeleton className="h-14 w-72 md:h-20 md:w-full md:max-w-xl" />
				<Skeleton className="h-4 w-full max-w-xl" />
			</header>

			<div className="grid gap-20 lg:grid-cols-[1fr_420px]">
				<div className="space-y-16">
					<div className="border border-border py-0 ring-0">
						<div className="p-5">
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
						</div>
					</div>
				</div>

				<aside className="space-y-10 lg:sticky lg:top-32">
					<div className="border border-border bg-card p-8">
						<Skeleton className="mb-8 h-3 w-40" />

						<div className="space-y-4 border border-border bg-card p-4">
							<Skeleton className="h-4 w-28" />

							<div className="space-y-2">
								{Array.from({ length: 4 }, (_, index) => (
									<div
										key={`checkout-summary-row-${index + 1}`}
										className="flex items-center justify-between"
									>
										<Skeleton className="h-3 w-20" />
										<Skeleton className="h-3 w-16" />
									</div>
								))}
							</div>

							<div className="space-y-2 border border-border bg-muted/40 p-2">
								<Skeleton className="h-3 w-2/3" />
								<Skeleton className="h-3 w-5/6" />
								<Skeleton className="h-1.5 w-full" />
							</div>
						</div>
					</div>

					<div className="space-y-6">
						<div className="border border-primary/35 bg-primary/5 p-4">
							<Skeleton className="mb-3 h-4 w-52" />
							<Skeleton className="h-4 w-full" />

							<div className="mt-4 space-y-2 border-t border-primary/20 pt-3">
								{Array.from({ length: 4 }, (_, index) => (
									<div
										key={`checkout-demo-field-${index + 1}`}
										className="grid grid-cols-[88px_1fr] gap-2"
									>
										<Skeleton className="h-3 w-full" />
										<Skeleton className="h-3 w-full" />
									</div>
								))}
							</div>
						</div>

						<Skeleton className="h-11 w-full" />
						<Skeleton className="h-12 w-full" />
					</div>

					<div className="border border-border/50 bg-secondary/5 p-5">
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-3 w-28" />
							</div>
							<div className="flex items-center justify-between">
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-3 w-28" />
							</div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	)
}
