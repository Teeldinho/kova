import { CATALOG_GRID_DESKTOP_CLASS_PATTERN } from '../config/constants'

export const getCatalogGridItemClass = (index: number): string => {
	const patternIndex = index % CATALOG_GRID_DESKTOP_CLASS_PATTERN.length

	return `col-span-1 ${CATALOG_GRID_DESKTOP_CLASS_PATTERN[patternIndex]}`
}
