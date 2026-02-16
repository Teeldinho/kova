import { Marquee } from '@/shared/ui/marquee'

import { CATALOG_MARQUEE_ITEMS } from '../config/constants'

export function CatalogMarquee() {
	return (
		<Marquee>
			{CATALOG_MARQUEE_ITEMS.map((item) => (
				<span
					key={item}
					className="font-mono text-[10px] font-medium uppercase tracking-widest text-background"
				>
					{item}
				</span>
			))}
		</Marquee>
	)
}
