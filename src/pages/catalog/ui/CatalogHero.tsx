import { ArrowDown } from '@phosphor-icons/react'
import { m as motion } from 'framer-motion'
import { useMemo } from 'react'

import { Magnetic } from '@/shared/ui'

import { CATALOG_HERO } from '../config/constants'
import { createHeroTitleCharacters } from '../lib/heroTitle'

const heroTitleContainerVariants = {
	hidden: {},
	visible: {
		transition: {
			delayChildren: 0.06,
			staggerChildren: CATALOG_HERO.TITLE_LETTER_STAGGER_SEC,
		},
	},
}

const heroTitleLetterVariants = {
	hidden: {
		opacity: 0,
		y: CATALOG_HERO.TITLE_LETTER_Y_OFFSET_PX,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: CATALOG_HERO.TITLE_LETTER_DURATION_SEC,
			ease: [0.16, 1, 0.3, 1] as const,
		},
	},
}

export function CatalogHero() {
	const titleCharacters = useMemo(
		() => createHeroTitleCharacters(CATALOG_HERO.TITLE),
		[],
	)

	return (
		<section className="ambient-surface relative overflow-hidden border-b border-border bg-background pb-16 pt-32 md:pb-32 md:pt-48">
			<div className="specimen-grid absolute inset-0" />
			<div className="scanning-line absolute inset-x-0 top-0 w-full" />

			<div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 text-center md:px-6">
				<div className="hero-enter-fade mb-10 flex items-center gap-4">
					<div className="h-px w-8 bg-primary/40" />
					<span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-primary">
						{CATALOG_HERO.EYEBROW}
					</span>
					<div className="h-px w-8 bg-primary/40" />
				</div>

				<div className="relative mb-12 overflow-hidden py-4">
					<motion.h1
						className="font-mono text-7xl font-black uppercase tracking-tighter text-foreground leading-none md:text-9xl lg:text-[12rem]"
						aria-label={CATALOG_HERO.TITLE}
						initial="hidden"
						animate="visible"
						variants={heroTitleContainerVariants}
					>
						{titleCharacters.map((letter) =>
							letter.isSpace ? (
								<span
									key={letter.id}
									className="inline-block"
									aria-hidden="true"
									style={{ width: `${CATALOG_HERO.TITLE_WORD_GAP_EM}em` }}
								>
									{'\u00A0'}
								</span>
							) : (
								<motion.span
									key={letter.id}
									className="inline-block"
									aria-hidden="true"
									variants={heroTitleLetterVariants}
								>
									{letter.character}
								</motion.span>
							),
						)}
					</motion.h1>
					<div className="hero-enter-line mt-6 h-1.5 w-full bg-primary origin-left" />
				</div>

				<p className="hero-enter-fade hero-enter-fade-delay-1 mb-20 max-w-2xl font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground leading-relaxed md:text-sm">
					{CATALOG_HERO.DESCRIPTION}
				</p>

				<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-3 md:gap-24">
					<div className="hero-enter-fade hero-enter-fade-delay-2 flex flex-col items-center gap-3">
						<span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground opacity-60">
							{CATALOG_HERO.ARCHIVE_INDEX_LABEL}
						</span>
						<span className="font-mono text-4xl font-black text-foreground tracking-tighter">
							{CATALOG_HERO.ARCHIVE_INDEX_VALUE}
						</span>
					</div>

					<div className="flex flex-col items-center justify-center">
						<Magnetic strength={0.3}>
							<motion.a
								href="#products"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="group relative flex h-24 w-24 items-center justify-center rounded-full border border-primary/30 text-primary transition-all hover:bg-primary hover:text-background hover:border-primary"
								data-cursor-label="SCROLL"
							>
								<ArrowDown
									className="transition-transform group-hover:translate-y-2"
									size={28}
								/>
								<svg
									className="absolute inset-0 h-full w-full animate-[spin_12s_linear_infinite]"
									viewBox="0 0 100 100"
								>
									<title>Registry Artifact Retrieval Protocol</title>
									<path
										id="circlePath"
										d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
										fill="transparent"
									/>
									<text className="fill-current font-mono text-[9px] font-bold uppercase tracking-[0.25em]">
										<textPath xlinkHref="#circlePath">
											{CATALOG_HERO.REGISTRY_CIRCLE_TEXT}
										</textPath>
									</text>
								</svg>
							</motion.a>
						</Magnetic>
					</div>

					<div className="hero-enter-fade hero-enter-fade-delay-3 flex flex-col items-center gap-3">
						<span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground opacity-60">
							{CATALOG_HERO.STATUS_LABEL}
						</span>
						<div className="flex items-center gap-3 border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5">
							<div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
							<span className="font-mono text-[11px] font-bold uppercase text-foreground tracking-widest">
								{CATALOG_HERO.STATUS_VALUE}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute top-10 left-10 h-10 w-10 border-t border-l border-primary/20" />
			<div className="absolute top-10 right-10 h-10 w-10 border-t border-r border-primary/20" />
			<div className="absolute bottom-10 left-10 hidden h-10 w-10 border-b border-l border-primary/20 md:block" />
			<div className="absolute bottom-10 right-10 hidden h-10 w-10 border-b border-r border-primary/20 md:block" />

			<div className="mt-10 w-full text-center font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground opacity-30 md:absolute md:bottom-10 md:left-1/2 md:mt-0 md:w-auto md:-translate-x-1/2">
				{CATALOG_HERO.PROTOCOL_VERSION}
			</div>
		</section>
	)
}
