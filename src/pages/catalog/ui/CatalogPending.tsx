import { Skeleton } from '@/shared/ui'

export function CatalogPending() {
	return (
		<div className="space-y-6 pb-12 md:space-y-8 md:pb-16">
			<section className="relative overflow-hidden border-b border-border bg-background pb-12 pt-32 md:pb-32 md:pt-48">
				<div className="mx-auto flex max-w-7xl flex-col items-center px-4 text-center md:px-6">
					<Skeleton className="mb-10 h-3 w-56" />
					<Skeleton className="mb-6 h-16 w-full max-w-3xl md:h-24" />
					<Skeleton className="mb-12 h-1.5 w-full max-w-3xl" />
					<Skeleton className="mb-16 h-4 w-full max-w-2xl" />
					<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-3 md:gap-24">
						<Skeleton className="mx-auto h-14 w-24" />
						<Skeleton className="mx-auto h-24 w-24 rounded-full" />
						<Skeleton className="mx-auto h-10 w-36" />
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl space-y-5 px-4 md:space-y-6 md:px-6">
				<Skeleton className="h-20 w-full border border-border" />
				<Skeleton className="h-12 w-full border border-border" />

				<div className="grid grid-cols-2 gap-4 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-10">
					{Array.from({ length: 8 }, (_, index) => (
						<Skeleton
							key={`catalog-skeleton-${index + 1}`}
							className="col-span-1 h-80 border border-border lg:h-96"
						/>
					))}
				</div>
			</section>
		</div>
	)
}
