import { APP_NAME, APP_TAGLINE } from "@/shared/config/constants";

const FOOTER_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
] as const;

export function useFooter() {
  const currentYear = new Date().getFullYear();

  return {
    appName: APP_NAME,
    tagline: APP_TAGLINE,
    currentYear,
    links: FOOTER_LINKS,
  };
}
