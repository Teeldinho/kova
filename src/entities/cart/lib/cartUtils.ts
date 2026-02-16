import { CART } from "../config/constants";
import type { CartItem } from "../model/types";

export const calculateSubtotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

export const calculateTax = (
  subtotal: number,
  taxRate: number = CART.TAX_RATE,
): number => subtotal * taxRate;

export const calculateTotal = (items: CartItem[]): number => {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  return subtotal + tax;
};

export const getCartItemCount = (items: CartItem[]): number =>
  items.reduce((count, item) => count + item.quantity, 0);
