/**
 * Re-exports the official lenis/react hook so consumers stay decoupled from
 * the third-party package path. `useLenis()` returns the root Lenis instance
 * provided by <ReactLenis root> in AppProviders.
 */
export { useLenis } from 'lenis/react'

/**
 * Easing function for scroll-to-top navigation.
 *
 * easeOutBack: Overshoots the target slightly then settles — gives the
 * "physics settle / micro-bounce" feel on page arrival.
 *
 * Visualised: fast approach → tiny overshoot past 0 → snap back → rest.
 * Duration of 1.35s keeps it premium without feeling sluggish.
 */
const easeOutBack = (t: number): number => {
	const c1 = 1.70158
	const c3 = c1 + 1
	return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
}

export const SCROLL_EASING = {
	/** Total animation duration in seconds */
	DURATION: 1.35,
	/** easeOutBack — fast approach with a subtle spring settle at the destination */
	EASING: easeOutBack,
} as const
