export type { CatalogSearch } from './config/searchSchema'
export { CATALOG_SORT_VALUES, catalogSearchSchema } from './config/searchSchema'
export {
	filterProducts,
	getPageNumbers,
	paginateProducts,
	sortProducts,
} from './lib/catalogFilters'
export { useCatalogFilters } from './model/useCatalogFilters'
export { CatalogFilters } from './ui/CatalogFilters'
export { Pagination } from './ui/Pagination'
