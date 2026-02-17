import { RelatedProducts } from '@/features/related-products'

import { useProductDetail } from '../model/useProductDetail'
import { ProductDetailImage } from './ProductDetailImage'
import { ProductDetailInfo } from './ProductDetailInfo'

interface ProductDetailPageProps {
	productId: number
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
	const {
		product,
		quantity,
		handleProductAddToCart,
		handleProductQuantityDecrease,
		handleProductQuantityIncrease,
	} = useProductDetail(productId)

	return (
		<div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:space-y-10 md:px-6 md:py-10">
			<div className="grid gap-6 md:grid-cols-2 md:gap-8">
				<ProductDetailImage product={product} />
				<ProductDetailInfo
					product={product}
					quantity={quantity}
					handleProductQuantityIncrease={handleProductQuantityIncrease}
					handleProductQuantityDecrease={handleProductQuantityDecrease}
					handleProductAddToCart={handleProductAddToCart}
				/>
			</div>

			<RelatedProducts
				currentProductId={product.id}
				currentProductCategory={product.category}
			/>
		</div>
	)
}
