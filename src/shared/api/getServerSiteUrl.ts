import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { getRequestOrigin } from '@/shared/lib'

export const getServerSiteUrl = createServerFn({ method: 'GET' }).handler(
	async () => {
		const request = getRequest()

		return getRequestOrigin(request)
	},
)
