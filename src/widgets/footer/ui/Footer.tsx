import { useFooter } from "../model/useFooter";

export function Footer() {
  const { appName, tagline, currentYear, links } = useFooter();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div className="space-y-2">
          <p className="font-mono text-xs font-black tracking-[0.3em]">
            {appName}
          </p>
          <p className="max-w-sm text-xs text-muted-foreground">{tagline}</p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-start gap-3 lg:gap-4"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-[10px] text-muted-foreground lg:col-span-2">
          © {currentYear} {appName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
