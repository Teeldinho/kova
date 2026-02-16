import { useFooter } from '../model/useFooter'

export function Footer() {
	const { appName, currentYear, links, tagline } = useFooter()

	return (
		<footer className="border-t border-border bg-card">
			<div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-end md:justify-between md:px-6">
				<div className="space-y-2">
					<p className="font-mono text-sm font-black tracking-[0.3em]">
						{appName}
					</p>
					<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
						{tagline}
					</p>
				</div>

				<div className="space-y-3 text-right">
					<nav
						className="flex items-center justify-end gap-4"
						aria-label="Footer links"
					>
						{links.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
							>
								{link.label}
							</a>
						))}
					</nav>
					<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
						© {currentYear} {appName}
					</p>
				</div>
			</div>
		</footer>
	)
}
