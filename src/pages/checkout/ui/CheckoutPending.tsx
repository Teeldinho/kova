import { Skeleton } from '@/shared/ui'

export function CheckoutPending() {
	return (
		<div className="mx-auto max-w-7xl space-y-10 px-4 pt-32 pb-12 md:px-6 md:pt-40 md:pb-20">
			<div className="space-y-4 border-b border-border pb-10">
				<Skeleton className="h-3 w-64" />
				<Skeleton className="h-14 w-72" />
				<Skeleton className="h-4 w-full max-w-xl" />
			</div>

			<div className="grid gap-20 lg:grid-cols-[1fr_420px]">
				<div className="space-y-8">
					{Array.from({ length: 3 }, (_, index) => (
						<Skeleton
							key={`checkout-field-skeleton-${index + 1}`}
							className="h-28 border border-border"
						/>
					))}
				</div>

				<div className="space-y-6">
					<Skeleton className="h-[340px] border border-border" />
					<Skeleton className="h-36 border border-border" />
					<Skeleton className="h-12 border border-border" />
					<Skeleton className="h-12 border border-border" />
				</div>
			</div>
		</div>
	)
}
