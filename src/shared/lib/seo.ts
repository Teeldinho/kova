import { SEO } from '@/shared/config'

const normalizePathname = (pathname: string): string => {
	if (pathname === '/') {
		return pathname
	}

	return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

const normalizeSiteUrl = (siteUrl: string): string =>
	siteUrl.replace(/\/+$/, '')

export const getSiteUrl = (): string | undefined => {
	const rawSiteUrl = import.meta.env[SEO.SITE_URL_ENV_KEY]

	if (typeof rawSiteUrl !== 'string' || rawSiteUrl.length === 0) {
		if (typeof window === 'undefined') {
			return undefined
		}

		return normalizeSiteUrl(window.location.origin)
	}

	return normalizeSiteUrl(rawSiteUrl)
}

export const getCanonicalUrl = (pathname: string): string => {
	const siteUrl = getSiteUrl()
	const normalizedPathname = normalizePathname(pathname)

	if (!siteUrl) {
		return normalizedPathname
	}

	return `${siteUrl}${normalizedPathname}`
}

export const getOgImageUrl = (): string => {
	const siteUrl = getSiteUrl()

	if (!siteUrl) {
		return SEO.DEFAULT_OG_IMAGE_PATH
	}

	return `${siteUrl}${SEO.DEFAULT_OG_IMAGE_PATH}`
}

export const getRequestOrigin = (request: Request): string =>
	normalizeSiteUrl(new URL(request.url).origin)

export const getAbsoluteUrl = (origin: string, pathname: string): string =>
	`${normalizeSiteUrl(origin)}${normalizePathname(pathname)}`
