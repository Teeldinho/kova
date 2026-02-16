import { queryOptions } from '@tanstack/react-query'

import {
	getAllProducts,
	getGetAllProductsQueryKey,
	getGetProductByIdQueryKey,
	getProductById,
} from '@/shared/api/generated/fakestore'
import type { Product } from '../model/types'

type ProductsResponse = { data: Product[]; status: number; headers: Headers }
type ProductResponse = { data: Product; status: number; headers: Headers }

export const productQueries = {
	list: () =>
		queryOptions({
			queryKey: getGetAllProductsQueryKey(),
			queryFn: () => getAllProducts() as Promise<ProductsResponse>,
			select: (response) => response.data,
			staleTime: 1000 * 60 * 5,
		}),

	detail: (id: number) =>
		queryOptions({
			queryKey: getGetProductByIdQueryKey(id),
			queryFn: () => getProductById(id) as Promise<ProductResponse>,
			select: (response) => response.data,
			staleTime: 1000 * 60 * 5,
		}),
}
