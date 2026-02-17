import { HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface RootDocumentProps {
	children: ReactNode
}

const THEME_INIT_SCRIPT = `
(function(){
  try {
    var t = localStorage.getItem('kova-theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`

export function RootDocument({ children }: RootDocumentProps) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: inline script prevents dark-mode FOUC during SSR hydration */}
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				{children}
				<Scripts />
			</body>
		</html>
	)
}
