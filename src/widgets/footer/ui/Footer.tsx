import { Link } from '@tanstack/react-router'

import { useFooter } from '../model/useFooter'

export function Footer() {
	const { appName, currentYear, links, tagline } = useFooter()

	return (
		<footer className="border-t border-border bg-background">
			<div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 md:flex-row md:items-end md:justify-between md:px-6 md:py-20">
				<div className="space-y-6">
					<div className="flex items-center gap-3">
						<div className="h-4 w-4 border border-primary" />
						<p className="font-mono text-sm font-black uppercase tracking-[0.3em]">
							{appName}
						</p>
					</div>
					<p className="max-w-xs font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground leading-relaxed">
						{tagline}
					</p>
				</div>

				<div className="space-y-6">
					<nav
						className="flex flex-wrap items-center gap-6"
						aria-label="Footer links"
					>
						{links.map((link) => (
							<Link
								key={link.label}
								to={link.href}
								className="group relative font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
							>
								{link.label}
								<span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
							</Link>
						))}
					</nav>

					<div className="flex items-center justify-between gap-6 border-t border-border/50 pt-6">
						<p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
							© {currentYear} {appName}
						</p>
						<p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
							Archive_v4.0.6
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
