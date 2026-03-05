import { Skeleton } from '@/shared/ui'

export function CartPending() {
	return (
		<div className="mx-auto max-w-7xl space-y-10 px-4 pt-32 pb-12 md:px-6 md:pt-40 md:pb-20">
			<header className="space-y-6 border-b border-border pb-12">
				<div className="flex items-center gap-4">
					<Skeleton className="h-px w-8" />
					<Skeleton className="h-3 w-56" />
				</div>
				<Skeleton className="h-14 w-64 md:h-16 md:w-80" />
			</header>

			<div className="grid gap-16 lg:grid-cols-[1fr_380px] lg:items-start">
				<div className="space-y-6">
					{Array.from({ length: 3 }, (_, index) => (
						<div
							key={`cart-item-skeleton-${index + 1}`}
							className="border border-border bg-card p-4"
						>
							<div className="flex gap-6 py-6">
								<Skeleton className="h-24 w-24 shrink-0 border border-border" />
								<div className="min-w-0 flex-1 space-y-3">
									<Skeleton className="h-8 w-full max-w-sm" />
									<div className="flex items-center justify-between gap-4">
										<Skeleton className="h-6 w-24" />
										<Skeleton className="h-9 w-36" />
									</div>
									<Skeleton className="h-8 w-24" />
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="space-y-4 lg:sticky lg:top-24">
					<Skeleton className="h-16 border border-border" />
					<div className="space-y-4 border border-border bg-card p-4">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-11 w-full" />
					</div>
					<div className="flex justify-center">
						<Skeleton className="h-8 w-36" />
					</div>
				</div>
			</div>
		</div>
	)
}
