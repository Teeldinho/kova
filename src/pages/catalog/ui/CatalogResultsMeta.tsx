import { Skeleton } from '@/shared/ui'

interface CatalogResultsMetaProps {
	currentPage?: number
	isPending?: boolean
	totalItems?: number
	totalPages?: number
}

export function CatalogResultsMeta({
	currentPage,
	isPending = false,
	totalItems,
	totalPages,
}: CatalogResultsMetaProps) {
	if (isPending) {
		return (
			<div className="flex items-center justify-between gap-3">
				<Skeleton className="h-3 w-14" />
				<Skeleton className="h-3 w-18" />
			</div>
		)
	}

	return (
		<div className="flex items-center justify-between gap-3">
			<p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
				<span className="h-1 w-1 bg-primary" />
				<span className="tabular-nums">{totalItems}</span>
				<span>items</span>
			</p>

			<p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
				<span className="h-1 w-1 bg-primary" />
				<span>Page</span>
				<span className="tabular-nums">{currentPage}</span>
				<span>of</span>
				<span className="tabular-nums">{totalPages}</span>
			</p>
		</div>
	)
}
