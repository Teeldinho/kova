import { ShoppingBag } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'

import { ThemeToggle } from '@/features/theme'
import { APP_NAME } from '@/shared/config'
import { Button, Magnetic } from '@/shared/ui'

import { useHeader } from '../model/useHeader'

export function Header() {
	const { navigation, itemCount, handleHeaderCartOpen } = useHeader()

	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-lg">
			<div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
				<Magnetic strength={0.15}>
					<Link
						to="/"
						className="group flex items-center gap-3 font-mono text-sm font-black uppercase tracking-[0.3em] text-foreground md:text-base"
					>
						<div className="relative h-5 w-5 border border-primary transition-all group-hover:bg-primary">
							<div className="absolute -top-0.5 -left-0.5 h-1 w-1 bg-background" />
						</div>
						<span>{APP_NAME}</span>
					</Link>
				</Magnetic>

				<nav className="flex items-center gap-8" aria-label="Main navigation">
					<div className="hidden items-center gap-8 md:flex">
						{navigation.map((item) => (
							<Link
								key={item.label}
								to={item.href}
								className="group relative py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
							>
								{item.label}
								<span className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
							</Link>
						))}
					</div>

					<div className="flex items-center gap-4">
						<ThemeToggle />

						<Magnetic strength={0.2}>
							<Button
								type="button"
								variant="default"
								size="icon"
								className="relative h-10 w-10"
								onClick={handleHeaderCartOpen}
								aria-label="Open cart"
								data-cursor-label="CART"
							>
								<ShoppingBag size={18} weight="bold" />
								{itemCount > 0 && (
									<span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center bg-primary px-1 font-mono text-[8px] font-black text-background">
										{itemCount.toString().padStart(2, '0')}
									</span>
								)}
							</Button>
						</Magnetic>
					</div>
				</nav>
			</div>
		</header>
	)
}
