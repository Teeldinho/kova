import { ShoppingBag } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'

import { APP_NAME } from '@/shared/config'
import { Button } from '@/shared/ui'

import { useHeader } from '../model/useHeader'

export function Header() {
	const { navigation, itemCount, handleHeaderCartOpen } = useHeader()

	return (
		<header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
			<div className="absolute inset-x-0 top-0 h-px bg-primary/50" />
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
				<Link
					to="/"
					className="group inline-flex items-center gap-2 font-mono text-xs font-black tracking-[0.3em] md:text-sm"
				>
					{APP_NAME}
					<span className="h-1.5 w-1.5 bg-primary transition-transform group-hover:scale-125" />
				</Link>

				<nav
					className="flex items-center gap-4 md:gap-6"
					aria-label="Main navigation"
				>
					{navigation.map((item) => (
						<Link
							key={item.label}
							to={item.href}
							className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
						>
							{item.label}
						</Link>
					))}

					<Button
						type="button"
						variant="outline"
						size="icon"
						className="relative h-9 w-9 rounded-none"
						onClick={handleHeaderCartOpen}
						aria-label="Open cart"
					>
						<ShoppingBag size={16} />
						{itemCount > 0 ? (
							<span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-none border border-background bg-primary px-1 font-mono text-[9px] font-bold text-primary-foreground">
								{itemCount}
							</span>
						) : null}
					</Button>
				</nav>
			</div>
		</header>
	)
}
