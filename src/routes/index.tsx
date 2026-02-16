import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
	return (
		<div className="flex min-h-dvh items-center justify-center">
			<h1 className="font-mono text-4xl font-black tracking-[0.3em]">KOVA</h1>
		</div>
	)
}
