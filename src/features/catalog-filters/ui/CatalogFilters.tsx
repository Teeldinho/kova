import { PRODUCT_CATEGORIES } from '@/entities/product'
import { SORT_OPTIONS } from '@/shared/config'
import {
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui'
import { CATALOG_FILTER } from '../config/constants'
import { useCatalogFilters } from '../model/useCatalogFilters'

export function CatalogFilters() {
	const {
		search,
		selectedCategoryLabel,
		selectedSortLabel,
		handleCatalogCategoryChange,
		handleCatalogSearchInputChange,
		handleCatalogSortChange,
	} = useCatalogFilters()

	return (
		<section className="relative border border-border bg-card p-4 md:p-5">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/40" />
			<div className="grid gap-4 md:grid-cols-3">
				<div className="space-y-1.5">
					<Label
						htmlFor={CATALOG_FILTER.IDS.SEARCH}
						className="font-mono text-[10px] uppercase tracking-widest"
					>
						{CATALOG_FILTER.SEARCH_LABEL}
					</Label>
					<Input
						id={CATALOG_FILTER.IDS.SEARCH}
						value={search.q}
						onChange={handleCatalogSearchInputChange}
						placeholder={CATALOG_FILTER.SEARCH_PLACEHOLDER}
						className="font-mono text-xs"
						aria-required={false}
					/>
				</div>

				<div className="space-y-1.5">
					<Label
						htmlFor={CATALOG_FILTER.IDS.CATEGORY}
						className="font-mono text-[10px] uppercase tracking-widest"
					>
						{CATALOG_FILTER.CATEGORY_LABEL}
					</Label>
					<Select
						value={search.category}
						onValueChange={handleCatalogCategoryChange}
					>
						<SelectTrigger
							id={CATALOG_FILTER.IDS.CATEGORY}
							className="w-full font-mono text-xs"
						>
							<SelectValue placeholder={CATALOG_FILTER.CATEGORY_PLACEHOLDER}>
								{selectedCategoryLabel}
							</SelectValue>
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
					<Label
						htmlFor={CATALOG_FILTER.IDS.SORT}
						className="font-mono text-[10px] uppercase tracking-widest"
					>
						{CATALOG_FILTER.SORT_LABEL}
					</Label>
					<Select value={search.sort} onValueChange={handleCatalogSortChange}>
						<SelectTrigger
							id={CATALOG_FILTER.IDS.SORT}
							className="w-full font-mono text-xs"
						>
							<SelectValue placeholder={CATALOG_FILTER.SORT_PLACEHOLDER}>
								{selectedSortLabel}
							</SelectValue>
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
