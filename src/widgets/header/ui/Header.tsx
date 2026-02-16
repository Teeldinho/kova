import { ShoppingBag } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'

import { APP_NAME } from '@/shared/config'
import { Button } from '@/shared/ui/button'

import { useHeader } from '../model/useHeader'

export function Header() {
	const { navigation, itemCount, handleHeaderCartOpen } = useHeader()

	return (
		<header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
				<Link
					to="/"
					className="font-mono text-xs font-black tracking-[0.3em] md:text-sm"
				>
					{APP_NAME}
				</Link>

				<nav
					className="flex items-center gap-4 md:gap-6"
					aria-label="Main navigation"
				>
					{navigation.map((item) => (
						<a
							key={item.label}
							href={item.href}
							className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
						>
							{item.label}
						</a>
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
