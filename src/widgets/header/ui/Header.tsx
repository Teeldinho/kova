import { Button } from "@/shared/ui/button";

import { useHeader } from "../model/useHeader";

interface HeaderProps {
  handleCartSheetOpen: () => void;
}

export function Header({ handleCartSheetOpen }: HeaderProps) {
  const {
    appName,
    navItems,
    itemCount,
    handleHeaderCartClick,
    cartIcon: CartIcon,
  } = useHeader({ handleCartSheetOpen });

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="font-mono text-sm font-black tracking-[0.3em] sm:text-base"
        >
          {appName}
        </a>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:px-3"
            >
              {item.label}
            </a>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleHeaderCartClick}
            className="relative h-8 rounded-none border-border px-2 sm:px-3"
            aria-label="Open cart"
          >
            <CartIcon size={14} />
            <span className="hidden font-mono text-[10px] uppercase tracking-widest sm:inline">
              Cart
            </span>
            {itemCount > 0 ? (
              <span className="absolute -top-1.5 -right-1.5 inline-flex min-w-4 items-center justify-center border border-background bg-primary px-1 text-[9px] leading-4 font-bold text-primary-foreground">
                {itemCount}
              </span>
            ) : null}
          </Button>
        </nav>
      </div>
    </header>
  );
}
