import { APP_NAME, APP_TAGLINE } from '@/shared/config'

import { FOOTER_LINKS } from '../config/constants'

export function useFooter() {
	const currentYear = new Date().getFullYear()

	return {
		appName: APP_NAME,
		tagline: APP_TAGLINE,
		currentYear,
		links: FOOTER_LINKS,
	}
}
