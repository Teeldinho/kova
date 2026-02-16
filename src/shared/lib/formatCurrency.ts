import { CURRENCY } from "@/shared/config/constants";

export const formatPrice = (priceUsd: number): string =>
  new Intl.NumberFormat(CURRENCY.LOCALE, {
    style: "currency",
    currency: CURRENCY.CODE,
    currencyDisplay: "narrowSymbol",
  }).format(priceUsd * CURRENCY.EXCHANGE_RATE);
