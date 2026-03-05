import { describe, expect, test } from 'vitest'

import {
	getOptimizedImageSrcSet,
	getOptimizedImageUrl,
} from './getOptimizedImage'

describe('getOptimizedImageUrl', () => {
	test('returns original value for local images', () => {
		expect(getOptimizedImageUrl('/image.png')).toBe('/image.png')
	})

	test('creates an optimized remote URL with width and quality params', () => {
		const result = getOptimizedImageUrl('https://cdn.example.com/image.jpg', {
			width: 320,
		})

		expect(result).toContain('https://wsrv.nl/?')
		expect(result).toContain('url=cdn.example.com%2Fimage.jpg')
		expect(result).toContain('w=320')
		expect(result).toContain('q=70')
		expect(result).toContain('output=webp')
	})
})

describe('getOptimizedImageSrcSet', () => {
	test('returns undefined for local images', () => {
		expect(getOptimizedImageSrcSet('/image.png', [160, 320])).toBeUndefined()
	})

	test('returns a width-based srcset for remote images', () => {
		const result = getOptimizedImageSrcSet(
			'https://cdn.example.com/image.jpg',
			[160, 320],
		)

		expect(result).toContain('w=160')
		expect(result).toContain('w=320')
		expect(result).toContain('160w')
		expect(result).toContain('320w')
	})
})
