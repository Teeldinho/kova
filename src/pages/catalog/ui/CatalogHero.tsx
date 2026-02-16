import { DecryptText } from '@/shared/ui'

import { CATALOG_HERO } from '../config/constants'

export function CatalogHero() {
	return (
		<section className="dot-grid relative overflow-hidden border border-border bg-card px-6 py-16 md:px-10 md:py-24">
			<div className="relative z-10 mx-auto max-w-4xl space-y-5 text-center">
				<p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
					KOVA COLLECTION
				</p>
				<h1 className="font-mono text-4xl leading-none font-black tracking-[0.22em] md:text-6xl">
					<DecryptText text={CATALOG_HERO.TITLE} />
				</h1>
				<p className="mx-auto max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
					{CATALOG_HERO.DESCRIPTION}
				</p>
			</div>
		</section>
	)
}
