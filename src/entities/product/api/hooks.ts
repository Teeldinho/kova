import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

import { productQueries } from './queries'

export const useProductsQuery = () => useQuery(productQueries.list())

export const useProducts = () => useSuspenseQuery(productQueries.list())

export const useProduct = (id: number) =>
	useSuspenseQuery(productQueries.detail(id))
