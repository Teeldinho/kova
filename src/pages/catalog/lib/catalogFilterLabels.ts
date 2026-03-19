import { PRODUCT_CATEGORIES } from '@/entities/product'
import { SORT_OPTIONS, type SortOption } from '@/shared/config'

import { CATALOG_FILTER } from '../config/constants'

const categoryLabelByValue = new Map<string, string>(
	PRODUCT_CATEGORIES.map((category) => [category.value, category.label]),
)

const sortLabelByValue = new Map<SortOption, string>(
	SORT_OPTIONS.map((option) => [option.value, option.label]),
)

export const getCategoryLabelByValue = (value: string) =>
	categoryLabelByValue.get(value) ?? CATALOG_FILTER.CATEGORY_PLACEHOLDER

export const getSortLabelByValue = (value: SortOption) =>
	sortLabelByValue.get(value) ?? CATALOG_FILTER.SORT_PLACEHOLDER
