import { ROUTES } from '@/shared/config'

export const FOOTER_LINKS = [
	{ label: 'Shop', href: ROUTES.HOME },
	{ label: 'Cart', href: ROUTES.CART },
	{ label: 'Checkout', href: ROUTES.CHECKOUT },
] as const
