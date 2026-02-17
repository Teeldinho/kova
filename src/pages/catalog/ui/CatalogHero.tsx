import { ArrowDown } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

import { CATALOG_HERO } from '../config/constants'

interface CatalogHeroProps {
	totalItems: number
}

export function CatalogHero({ totalItems }: CatalogHeroProps) {
	return (
		<section className="relative overflow-hidden border-b border-border bg-card/60">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,oklch(0.64_0.17_54.17_/_0.12),transparent_52%)]" />

			<div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-[1fr_auto] md:items-end md:gap-10 md:px-6 md:py-14">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="space-y-4"
				>
					<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
						{CATALOG_HERO.EYEBROW}
					</p>

					<h1 className="max-w-2xl font-sans text-3xl leading-tight font-light tracking-tight text-foreground md:text-4xl">
						{CATALOG_HERO.TITLE}
					</h1>

					<p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
						{CATALOG_HERO.DESCRIPTION}
					</p>

					<a
						href="#products"
						className="inline-flex items-center gap-2 border-b border-primary/70 pb-1 font-mono text-[10px] uppercase tracking-widest text-foreground transition-colors hover:text-primary"
					>
						{CATALOG_HERO.ACTION_LABEL}
						<ArrowDown size={12} />
					</a>
				</motion.div>

				<div className="w-fit border border-border bg-background/80 px-4 py-3">
					<p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
						{CATALOG_HERO.EYEBROW}
					</p>

					<p className="mt-2 font-mono text-2xl font-bold tracking-tight text-foreground md:text-3xl">
						{totalItems}
					</p>

					<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
						{CATALOG_HERO.TOTAL_ITEMS_SUFFIX}
					</p>
				</div>
			</div>
		</section>
	)
}
