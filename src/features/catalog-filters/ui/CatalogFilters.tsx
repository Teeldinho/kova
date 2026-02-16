import { PRODUCT_CATEGORIES } from '@/entities/product'
import { SORT_OPTIONS } from '@/shared/config'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'

import { useCatalogFilters } from '../model/useCatalogFilters'

export function CatalogFilters() {
	const {
		search,
		handleCatalogCategoryChange,
		handleCatalogSearchChange,
		handleCatalogSortChange,
	} = useCatalogFilters()

	return (
		<section className="border border-border bg-card p-4 md:p-5">
			<div className="grid gap-4 md:grid-cols-3">
				<div className="space-y-1.5">
					<Label
						htmlFor="catalog-search"
						className="font-mono text-[10px] uppercase tracking-widest"
					>
						Search
					</Label>
					<Input
						id="catalog-search"
						value={search.q}
						onChange={(event) =>
							handleCatalogSearchChange(event.currentTarget.value)
						}
						placeholder="Search products"
						className="font-mono text-xs"
					/>
				</div>

				<div className="space-y-1.5">
					<Label className="font-mono text-[10px] uppercase tracking-widest">
						Category
					</Label>
					<Select
						value={search.category}
						onValueChange={handleCatalogCategoryChange}
					>
						<SelectTrigger className="w-full font-mono text-xs">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							{PRODUCT_CATEGORIES.map((category) => (
								<SelectItem key={category.value} value={category.value}>
									{category.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-1.5">
					<Label className="font-mono text-[10px] uppercase tracking-widest">
						Sort
					</Label>
					<Select value={search.sort} onValueChange={handleCatalogSortChange}>
						<SelectTrigger className="w-full font-mono text-xs">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							{SORT_OPTIONS.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</section>
	)
}
