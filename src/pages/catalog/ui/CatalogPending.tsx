export function CatalogPending() {
	return (
		<div className="mx-auto max-w-7xl space-y-6 px-4 py-10 md:px-6">
			<div className="h-48 animate-pulse border border-border bg-card md:h-64" />
			<div className="h-20 animate-pulse border border-border bg-card" />
			<div className="h-16 animate-pulse border border-border bg-card" />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 8 }, (_, index) => (
					<div
						key={`catalog-skeleton-${index + 1}`}
						className="h-80 animate-pulse border border-border bg-card"
					/>
				))}
			</div>
		</div>
	)
}
