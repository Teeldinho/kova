import { Skeleton } from '@/shared/ui'

export function RelatedProductsPending() {
	return (
		<section className="space-y-6 border-t border-border pt-8 md:space-y-8 md:pt-10">
			<div className="flex flex-wrap items-end justify-between gap-3">
				<div className="space-y-1.5">
					<Skeleton className="h-7 w-48" />
					<Skeleton className="h-3 w-64" />
				</div>
				<Skeleton className="h-3 w-24" />
			</div>

			<div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
				{Array.from({ length: 4 }, (_, index) => (
					<div
						key={`related-product-skeleton-${index + 1}`}
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
	)
}
