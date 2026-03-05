import { CATALOG_FILTER } from '../config/constants'

const SCROLL_BEHAVIOR = {
	behavior: 'smooth',
	block: 'start',
} as const

interface LenisScrollToOptions {
	duration: number
	easing: (value: number) => number
	force: boolean
	offset: number
}

interface LenisController {
	scrollTo: (
		target: HTMLElement,
		options?: Partial<LenisScrollToOptions>,
	) => void
}

interface ScrollCatalogProductsSectionOptions {
	lenis?: LenisController
	scrollOptions?: LenisScrollToOptions
}

export function scrollCatalogProductsSection({
	lenis,
	scrollOptions,
}: ScrollCatalogProductsSectionOptions = {}) {
	if (typeof window === 'undefined') {
		return
	}

	const productsSection = document.getElementById(
		CATALOG_FILTER.IDS.PRODUCTS_SECTION,
	)

	if (!productsSection) {
		return
	}

	if (lenis && scrollOptions) {
		lenis.scrollTo(productsSection, scrollOptions)
		return
	}

	productsSection.scrollIntoView(SCROLL_BEHAVIOR)
}
