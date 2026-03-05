import { defineNitroConfig } from 'nitro/config'

export default defineNitroConfig({
	compressPublicAssets: {
		brotli: true,
		gzip: true,
	},
})
