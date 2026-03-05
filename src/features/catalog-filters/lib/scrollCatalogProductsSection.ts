import { CATALOG_FILTER } from '../config/constants'

const SCROLL_BEHAVIOR = {
	behavior: 'smooth',
	block: 'start',
} as const

export function scrollCatalogProductsSection() {
	if (typeof window === 'undefined') {
		return
	}

	const productsSection = document.getElementById(
		CATALOG_FILTER.IDS.PRODUCTS_SECTION,
	)

	if (!productsSection) {
		return
	}

	productsSection.scrollIntoView(SCROLL_BEHAVIOR)
}
