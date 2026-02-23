import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import type { Product } from '@/entities/product'

const { useProductsMock } = vi.hoisted(() => ({
	useProductsMock: vi.fn(),
}))

vi.mock('@/entities/product', () => ({
	useProducts: useProductsMock,
}))

import { useRelatedProducts } from './useRelatedProducts'

const products: Product[] = [
	{
		id: 1,
		title: 'Camera',
		price: 100,
		description: 'Camera',
		category: 'electronics',
		image: '/camera.png',
		rating: { rate: 4.2, count: 30 },
	},
	{
		id: 2,
		title: 'Headphones',
		price: 200,
		description: 'Headphones',
		category: 'electronics',
		image: '/headphones.png',
		rating: { rate: 4.8, count: 58 },
	},
	{
		id: 3,
		title: 'Jacket',
		price: 300,
		description: 'Jacket',
		category: "men's clothing",
		image: '/jacket.png',
		rating: { rate: 4.1, count: 17 },
	},
	{
		id: 4,
		title: 'Speaker',
		price: 400,
		description: 'Speaker',
		category: 'electronics',
		image: '/speaker.png',
		rating: { rate: 3.9, count: 11 },
	},
	{
		id: 5,
		title: 'Tablet',
		price: 500,
		description: 'Tablet',
		category: 'electronics',
		image: '/tablet.png',
		rating: { rate: 4.4, count: 22 },
	},
	{
		id: 6,
		title: 'Monitor',
		price: 600,
		description: 'Monitor',
		category: 'electronics',
		image: '/monitor.png',
		rating: { rate: 4.6, count: 27 },
	},
]

describe('useRelatedProducts', () => {
	test('returns products from same category without current product', () => {
		useProductsMock.mockReturnValue({ data: products })

		const { result } = renderHook(() =>
			useRelatedProducts({
				currentProductCategory: 'electronics',
				currentProductId: 1,
			}),
		)

		expect(result.current.hasRelatedProducts).toBe(true)
		expect(result.current.relatedProducts).toHaveLength(4)
		expect(result.current.relatedProducts.map((product) => product.id)).toEqual(
			[2, 4, 5, 6],
		)
	})

	test('returns empty state when category has no related products', () => {
		useProductsMock.mockReturnValue({ data: products })

		const { result } = renderHook(() =>
			useRelatedProducts({
				currentProductCategory: 'jewelery',
				currentProductId: 99,
			}),
		)

		expect(result.current.relatedProducts).toEqual([])
		expect(result.current.hasRelatedProducts).toBe(false)
	})
})
