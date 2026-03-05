import { PAGINATION } from '@/shared/config'
import { Skeleton } from '@/shared/ui'

import { getCatalogGridItemClass } from '../lib/catalogGrid'
import { CatalogResultsMeta } from './CatalogResultsMeta'

export function CatalogPending() {
	return (
		<div className="space-y-5 md:space-y-6">
			<CatalogResultsMeta isPending />

			<div className="grid grid-cols-2 gap-4 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-10">
				{Array.from({ length: PAGINATION.DEFAULT_LIMIT }, (_, index) => (
					<div
						key={`catalog-skeleton-${index + 1}`}
						className={getCatalogGridItemClass(index)}
					>
						<div className="border border-border bg-card">
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
					</div>
				))}
			</div>

			<div className="flex items-center justify-center gap-1 pt-2">
				<Skeleton className="h-8 w-8" />
				<Skeleton className="h-8 w-8" />
				<Skeleton className="h-8 w-8" />
				<Skeleton className="h-8 w-8" />
			</div>
		</div>
	)
}
