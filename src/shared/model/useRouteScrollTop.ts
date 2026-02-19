import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { SCROLL_EASING, useLenis } from './useLenis'

const SCROLL_TOP = 0

type RouteNavigationEvent = {
	pathChanged: boolean
	fromLocation?: unknown
}

const shouldHandleRouteChange = ({
	fromLocation,
	pathChanged,
}: RouteNavigationEvent) => pathChanged && Boolean(fromLocation)

export function useRouteScrollTop() {
	const router = useRouter()
	const lenis = useLenis()

	useEffect(() => {
		if (!lenis) {
			return
		}

		const handleBeforeNavigate = (event: RouteNavigationEvent) => {
			if (!shouldHandleRouteChange(event)) {
				return
			}

			lenis.stop()
		}

		const handleResolved = (event: RouteNavigationEvent) => {
			if (!shouldHandleRouteChange(event)) {
				return
			}

			lenis.start()
			lenis.scrollTo(SCROLL_TOP, {
				duration: SCROLL_EASING.DURATION * 0.7,
				easing: SCROLL_EASING.EASING,
				force: true,
			})
		}

		const unsubscribeBeforeNavigate = router.subscribe(
			'onBeforeNavigate',
			handleBeforeNavigate,
		)
		const unsubscribeResolved = router.subscribe('onResolved', handleResolved)

		return () => {
			unsubscribeBeforeNavigate()
			unsubscribeResolved()
		}
	}, [lenis, router])
}
