import { Button } from '@/shared/ui'

import { NOT_FOUND } from '../config/constants'
import { useNotFoundPage } from '../model/useNotFoundPage'

export function NotFoundPage() {
	const { handleNotFoundBackHome } = useNotFoundPage()

	return (
		<div className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
			<h1 className="font-mono text-xl font-bold uppercase tracking-wider md:text-2xl">
				{NOT_FOUND.TITLE}
			</h1>
			<p className="max-w-xl font-mono text-xs uppercase tracking-widest text-muted-foreground">
				{NOT_FOUND.DESCRIPTION}
			</p>
			<Button
				type="button"
				onClick={handleNotFoundBackHome}
				className="rounded-none font-mono text-[10px] uppercase tracking-widest"
			>
				{NOT_FOUND.BACK_HOME_LABEL}
			</Button>
		</div>
	)
}
