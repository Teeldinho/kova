import { HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { THEME } from '@/shared/config'

interface RootDocumentProps {
	children: ReactNode
}

const THEME_INIT_SCRIPT = `
(function(){
  try {
    var t = localStorage.getItem('${THEME.STORAGE_KEY}');
    var prefersDark = window.matchMedia('${THEME.MEDIA_QUERY}').matches;
    var isDark = t === '${THEME.DARK}' || (!t && prefersDark);
    document.documentElement.classList.toggle('${THEME.DARK_CLASS}', isDark);
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
