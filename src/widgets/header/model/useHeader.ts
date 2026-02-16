import { useCart } from '@/entities/cart'
import { useCartSheet } from '@/shared/model'
import { HEADER_NAVIGATION } from '../config/constants'

export function useHeader() {
	const { itemCount } = useCart()
	const { handleCartSheetOpen } = useCartSheet()

	const handleHeaderCartOpen = () => {
		handleCartSheetOpen()
	}

	return {
		navigation: HEADER_NAVIGATION,
		itemCount,
		handleHeaderCartOpen,
	}
}
