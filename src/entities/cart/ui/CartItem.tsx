import { ImageSquare, Minus, Plus, Trash } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { cn } from '@/shared/lib'
import { useImageLoadState } from '@/shared/model'
import { Button } from '@/shared/ui'
import { CART } from '../config/constants'
import type { CartItem as CartItemType } from '../model/types'
import { useCartItem } from '../model/useCartItem'

interface CartItemProps {
	item: CartItemType
	handleCartItemIncrease: () => void
	handleCartItemDecrease: () => void
	handleCartItemRemove: () => void
	/**
	 * Called when the user navigates to the product detail page via the image
	 * or title link. Use this to close a parent sheet/drawer, for example.
	 * Optional — omit when no side-effect is needed (e.g. CartPage).
	 */
	onNavigate?: () => void
	className?: string
}

export function CartItem({
	item,
	handleCartItemIncrease,
	handleCartItemDecrease,
	handleCartItemRemove,
	onNavigate,
	className,
}: CartItemProps) {
	const {
		decreaseQuantityLabel,
		displayPrice,
		imageAlt,
		imageSizes,
		imageSrc,
		imageSrcSet,
		increaseQuantityLabel,
		productId,
		quantity,
		removeLabel,
		title,
	} = useCartItem(item)
	const { handleImageError, handleImageLoad, isImageLoaded } =
		useImageLoadState(imageSrc)

	return (
		<article className={cn('flex gap-4 py-6 sm:gap-6', className)}>
			{/* Image — links to product detail page */}
			<Link
				to="/products/$productId"
				params={{ productId }}
				onClick={onNavigate}
				className="relative block h-24 w-24 shrink-0 overflow-hidden border border-border bg-muted/30 p-3 transition-opacity hover:opacity-80"
				aria-label={`View ${title}`}
			>
				{!isImageLoaded ? (
					<div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/50 text-primary/60">
						<ImageSquare size={20} weight="duotone" />
					</div>
				) : null}
				<img
					src={imageSrc}
					alt={imageAlt}
					srcSet={imageSrcSet}
					sizes={imageSizes}
					className={cn(
						'h-full w-full object-contain transition-opacity duration-200',
						isImageLoaded ? 'opacity-100' : 'opacity-0',
					)}
					loading="lazy"
					decoding="async"
					width={CART.IMAGE.SIZE_PX}
					height={CART.IMAGE.SIZE_PX}
					onLoad={handleImageLoad}
					onError={handleImageError}
				/>
			</Link>

			<div className="min-w-0 flex-1 space-y-3">
				{/* Title — also links to product detail page */}
				<Link
					to="/products/$productId"
					params={{ productId }}
					onClick={onNavigate}
					className="block"
				>
					<h3 className="line-clamp-2 font-mono text-sm font-bold uppercase tracking-tight text-foreground transition-colors hover:text-primary">
						{title}
					</h3>
				</Link>

				{/* Quantity controls — separate from any Link, zero propagation risk */}
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
					<p className="font-mono text-base font-black text-primary">
						{displayPrice}
					</p>

					<div className="flex w-fit items-center bg-background sm:ml-auto">
						<Button
							type="button"
							variant="outline"
							size="icon-sm"
							className="h-8 w-8 rounded-none border-2 border-r-0 border-border hover:bg-primary hover:text-background hover:border-primary sm:h-9 sm:w-9"
							onClick={handleCartItemDecrease}
							aria-label={decreaseQuantityLabel}
						>
							<Minus size={12} weight="bold" />
						</Button>
						<div className="flex h-8 w-12 items-center justify-center border-y-2 border-border bg-background sm:h-9 sm:w-14">
							<span className="font-mono text-xs font-bold">
								{quantity.toString().padStart(2, '0')}
							</span>
						</div>
						<Button
							type="button"
							variant="outline"
							size="icon-sm"
							className="h-8 w-8 rounded-none border-2 border-l-0 border-border hover:bg-primary hover:text-background hover:border-primary sm:h-9 sm:w-9"
							onClick={handleCartItemIncrease}
							aria-label={increaseQuantityLabel}
						>
							<Plus size={12} weight="bold" />
						</Button>
					</div>
				</div>

				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="h-8 px-0 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-transparent hover:text-destructive"
					onClick={handleCartItemRemove}
				>
					<Trash size={12} className="mr-1.5" />
					{removeLabel}
				</Button>
			</div>
		</article>
	)
}
