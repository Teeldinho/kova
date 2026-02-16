import { HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface RootDocumentProps {
	children: ReactNode
}

export function RootDocument({ children }: RootDocumentProps) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	)
}
