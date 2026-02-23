import { useStore } from '@tanstack/react-store'
import { Store } from '@tanstack/store'

interface CartSheetState {
	isOpen: boolean
}

const cartSheetStore = new Store<CartSheetState>({
	isOpen: false,
})

const setCartSheetOpen = (isOpen: boolean) => {
	cartSheetStore.setState(() => ({ isOpen }))
}

const openCartSheet = () => {
	setCartSheetOpen(true)
}

const closeCartSheet = () => {
	setCartSheetOpen(false)
}

export function useCartSheet() {
	const isOpen = useStore(cartSheetStore, (state) => state.isOpen)

	const handleCartSheetOpen = () => {
		openCartSheet()
	}

	const handleCartSheetClose = () => {
		closeCartSheet()
	}

	const handleCartSheetOpenChange = (nextOpen: boolean) => {
		setCartSheetOpen(nextOpen)
	}

	return {
		isOpen,
		handleCartSheetOpen,
		handleCartSheetClose,
		handleCartSheetOpenChange,
	}
}
