import { Skeleton } from '@/shared/ui'

export function ProductDetailPending() {
	return (
		<div className="ambient-surface relative min-h-dvh">
			<div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-20">
				<div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-20">
					<Skeleton className="h-120 border-2 border-border bg-card sm:h-140 md:h-160 lg:h-180" />

					<section className="space-y-8 lg:sticky lg:top-32">
						<div className="space-y-6">
							<div className="flex items-center gap-4">
								<Skeleton className="h-6 w-36" />
								<Skeleton className="h-3 w-20" />
							</div>
							<Skeleton className="h-20 w-full" />
							<div className="flex items-center gap-8 border-y border-border/40 py-6">
								<Skeleton className="h-5 w-32" />
								<div className="h-6 w-px bg-border" />
								<Skeleton className="h-10 w-24" />
							</div>
							<div className="space-y-4 pt-1">
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-12 w-56" />
								<Skeleton className="h-14 w-full" />
							</div>
						</div>

						<div className="space-y-8 border border-border bg-card p-6">
							<div className="space-y-4">
								<Skeleton className="h-4 w-48" />
								<Skeleton className="h-1.5 w-full" />
								<Skeleton className="h-3 w-56" />
							</div>
							<div className="space-y-3">
								<Skeleton className="h-4 w-44" />
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-3 w-5/6" />
							</div>
							<Skeleton className="h-4 w-64 border-t border-border pt-6" />
						</div>
					</section>
				</div>

				<div className="mt-32">
					<div className="mb-12 flex items-center gap-6">
						<Skeleton className="h-8 w-64" />
						<div className="h-px flex-1 bg-border/50" />
					</div>
					<section className="space-y-6 border-t border-border pt-8 md:space-y-8 md:pt-10">
						<div className="space-y-2">
							<Skeleton className="h-6 w-48" />
							<Skeleton className="h-3 w-64" />
						</div>

						<div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
							{Array.from({ length: 4 }, (_, index) => (
								<div
									key={`product-related-skeleton-${index + 1}`}
									className="border border-border bg-card"
								>
									<Skeleton className="h-72 w-full md:h-80 lg:h-96" />
									<div className="space-y-4 border-t border-border p-6">
										<div className="space-y-1.5">
											<Skeleton className="h-3 w-24" />
											<Skeleton className="h-5 w-4/5" />
										</div>
										<div className="space-y-3 border-t border-border/40 pt-4">
											<Skeleton className="h-3 w-2/3" />
											<Skeleton className="h-5 w-20" />
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}
