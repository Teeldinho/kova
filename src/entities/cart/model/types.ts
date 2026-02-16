import type { Product } from '@/entities/product/@x/cart'

export interface CartItem {
	product: Product
	quantity: number
}

export interface CartState {
	items: CartItem[]
}
