import { ShoppingCartSimple } from "@phosphor-icons/react";

import { useCart } from "@/entities/cart";
import { APP_NAME } from "@/shared/config/constants";

const HEADER_NAV_ITEMS = [
  { label: "Shop", href: "/" },
  { label: "Cart", href: "/cart" },
] as const;

interface UseHeaderParams {
  handleCartSheetOpen: () => void;
}

export function useHeader({ handleCartSheetOpen }: UseHeaderParams) {
  const { itemCount } = useCart();

  const handleHeaderCartClick = () => {
    handleCartSheetOpen();
  };

  return {
    appName: APP_NAME,
    navItems: HEADER_NAV_ITEMS,
    itemCount,
    handleHeaderCartClick,
    cartIcon: ShoppingCartSimple,
  };
}
