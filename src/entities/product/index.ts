export { useProduct, useProducts } from './api/hooks'
export { productQueries } from './api/queries'
export { PRODUCT, PRODUCT_CATEGORIES } from './config/constants'
export {
	formatRating,
	getCategoryLabel,
	truncateDescription,
} from './lib/formatProduct'
export type {
	Product,
	ProductCategory,
	ProductRating as ProductRatingData,
} from './model/types'
export { useProductCard } from './model/useProductCard'
export { useProductRating } from './model/useProductRating'
export { ProductCard } from './ui/ProductCard'
export { ProductRating } from './ui/ProductRating'
