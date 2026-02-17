import { queryOptions } from '@tanstack/react-query'

import {
	getAllProducts,
	getGetAllProductsQueryKey,
	getGetProductByIdQueryKey,
	getProductById,
} from '@/shared/api'
import { PRODUCT } from '../config/constants'
import type { Product } from '../model/types'

type ProductsResponse = { data: Product[]; status: number; headers: Headers }
type ProductResponse = { data: Product; status: number; headers: Headers }

export const productQueries = {
	list: () =>
		queryOptions({
			queryKey: getGetAllProductsQueryKey(),
			queryFn: () => getAllProducts() as Promise<ProductsResponse>,
			select: (response) => response.data,
			staleTime: PRODUCT.QUERY_LIST_STALE_TIME_MS,
			gcTime: PRODUCT.QUERY_CACHE_TIME_MS,
		}),

	detail: (id: number) =>
		queryOptions({
			queryKey: getGetProductByIdQueryKey(id),
			queryFn: () => getProductById(id) as Promise<ProductResponse>,
			select: (response) => response.data,
			staleTime: PRODUCT.QUERY_DETAIL_STALE_TIME_MS,
			gcTime: PRODUCT.QUERY_CACHE_TIME_MS,
		}),
}
