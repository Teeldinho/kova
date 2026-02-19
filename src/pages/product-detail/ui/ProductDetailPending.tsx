import { Skeleton } from '@/shared/ui'

export function ProductDetailPending() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
			<div className="grid gap-6 md:grid-cols-2 md:gap-8">
				<Skeleton className="h-[480px] border border-border bg-card" />

				<div className="space-y-6 border border-border bg-card p-6">
					<Skeleton className="h-3 w-32" />
					<Skeleton className="h-14 w-full" />
					<Skeleton className="h-12 w-56" />

					<div className="space-y-3 border-t border-border pt-4">
						<Skeleton className="h-3 w-24" />
						<Skeleton className="h-10 w-56" />
						<Skeleton className="h-12 w-full" />
					</div>

					<div className="space-y-3 border-t border-border pt-4">
						<Skeleton className="h-3 w-36" />
						<Skeleton className="h-2 w-full" />
						<Skeleton className="h-2 w-4/5" />
					</div>
				</div>
			</div>

			<div className="mt-12 space-y-4 border-t border-border pt-8">
				<Skeleton className="h-6 w-48" />
				<div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
					{Array.from({ length: 4 }, (_, index) => (
						<Skeleton
							key={`product-related-skeleton-${index + 1}`}
							className="h-72 border border-border"
						/>
					))}
				</div>
			</div>
		</div>
	)
}
