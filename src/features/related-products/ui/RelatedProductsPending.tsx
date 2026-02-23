import { Skeleton } from '@/shared/ui'

export function RelatedProductsPending() {
	return (
		<section className="space-y-6 border-t border-border pt-8 md:space-y-8 md:pt-10">
			<div className="space-y-2">
				<Skeleton className="h-6 w-48" />
				<Skeleton className="h-3 w-64" />
			</div>

			<div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
				{Array.from({ length: 4 }, (_, index) => (
					<Skeleton
						key={`related-product-skeleton-${index + 1}`}
						className="h-72 border border-border"
					/>
				))}
			</div>
		</section>
	)
}
