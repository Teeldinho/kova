import { Skeleton } from '@/shared/ui'

export function CartPending() {
	return (
		<div className="mx-auto max-w-7xl space-y-10 px-4 pt-32 pb-12 md:px-6 md:pt-40 md:pb-20">
			<div className="space-y-4 border-b border-border pb-10">
				<Skeleton className="h-3 w-52" />
				<Skeleton className="h-14 w-64" />
			</div>

			<div className="grid gap-16 lg:grid-cols-[1fr_380px] lg:items-start">
				<div className="space-y-4">
					{Array.from({ length: 3 }, (_, index) => (
						<Skeleton
							key={`cart-item-skeleton-${index + 1}`}
							className="h-40 border border-border"
						/>
					))}
				</div>

				<div className="space-y-4 lg:sticky lg:top-24">
					<Skeleton className="h-24 border border-border" />
					<Skeleton className="h-[420px] border border-border" />
				</div>
			</div>
		</div>
	)
}
