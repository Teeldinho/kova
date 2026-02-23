import { getAllProducts } from './generated/fakestore'

export const getSitemapProductIds = async (): Promise<number[]> => {
	try {
		const productsResponse = await getAllProducts()

		return productsResponse.data.map((product) => product.id)
	} catch {
		return []
	}
}
