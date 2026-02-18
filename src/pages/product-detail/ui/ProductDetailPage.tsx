import { motion } from 'framer-motion'
import { RelatedProducts } from '@/features/related-products'
import { Particles } from '@/shared/ui'

import { useProductDetail } from '../model/useProductDetail'
import { ProductDetailImage } from './ProductDetailImage'
import { ProductDetailInfo } from './ProductDetailInfo'

interface ProductDetailPageProps {
	productId: number
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
	const {
		product,
		projectedRewardSnapshot,
		quantity,
		handleProductAddToCart,
		handleProductQuantityDecrease,
		handleProductQuantityIncrease,
	} = useProductDetail(productId)

	return (
		<div className="ambient-surface relative min-h-screen">
			{/* Specimen Registry Backdrop */}
			<div className="specimen-grid fixed inset-0 opacity-20 pointer-events-none" />
			<Particles className="fixed inset-0" count={30} />

			<div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-20">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-20"
				>
					<ProductDetailImage product={product} />
					<ProductDetailInfo
						product={product}
						projectedRewardSnapshot={projectedRewardSnapshot}
						quantity={quantity}
						handleProductQuantityIncrease={handleProductQuantityIncrease}
						handleProductQuantityDecrease={handleProductQuantityDecrease}
						handleProductAddToCart={handleProductAddToCart}
					/>
				</motion.div>

				<div className="mt-32">
					<div className="mb-12 flex items-center gap-6">
						<h2 className="font-mono text-2xl font-bold uppercase tracking-tighter">
							Related Specimens
						</h2>
						<div className="h-[1px] flex-1 bg-border/50" />
					</div>
					<RelatedProducts
						currentProductId={product.id}
						currentProductCategory={product.category}
					/>
				</div>
			</div>
		</div>
	)
}
