import { HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface RootDocumentProps {
	children: ReactNode
}

const THEME_INIT_SCRIPT = `
(function(){
  try {
    var t = localStorage.getItem('kova-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = t === 'dark' || (!t && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
  } catch(e) {}
})();
`

export function RootDocument({ children }: RootDocumentProps) {
	return (
		<html lang="en">
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: inline script prevents theme FOUC before hydration */}
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	)
}
