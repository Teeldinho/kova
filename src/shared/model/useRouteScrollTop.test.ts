import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const {
	lenisMock,
	subscribeMock,
	unsubscribeBeforeNavigateMock,
	unsubscribeResolvedMock,
	useRouterMock,
	useLenisMock,
} = vi.hoisted(() => ({
	lenisMock: {
		start: vi.fn(),
		stop: vi.fn(),
		scrollTo: vi.fn(),
	},
	subscribeMock: vi.fn(),
	unsubscribeBeforeNavigateMock: vi.fn(),
	unsubscribeResolvedMock: vi.fn(),
	useRouterMock: vi.fn(),
	useLenisMock: vi.fn(),
}))

vi.mock('@tanstack/react-router', () => ({
	useRouter: useRouterMock,
}))

vi.mock('./useLenis', () => ({
	SCROLL_EASING: {
		DURATION: 1.35,
		EASING: vi.fn(),
	},
	useLenis: useLenisMock,
}))

import { useRouteScrollTop } from './useRouteScrollTop'

describe('useRouteScrollTop', () => {
	let beforeNavigateHandler:
		| ((event: { pathChanged: boolean; fromLocation?: unknown }) => void)
		| null
	let resolvedHandler:
		| ((event: { pathChanged: boolean; fromLocation?: unknown }) => void)
		| null

	beforeEach(() => {
		beforeNavigateHandler = null
		resolvedHandler = null

		lenisMock.start.mockReset()
		lenisMock.stop.mockReset()
		lenisMock.scrollTo.mockReset()

		unsubscribeBeforeNavigateMock.mockReset()
		unsubscribeResolvedMock.mockReset()

		subscribeMock.mockReset()
		subscribeMock.mockImplementation((eventType, handler) => {
			if (eventType === 'onBeforeNavigate') {
				beforeNavigateHandler = handler as (event: {
					pathChanged: boolean
					fromLocation?: unknown
				}) => void
				return unsubscribeBeforeNavigateMock
			}

			if (eventType === 'onResolved') {
				resolvedHandler = handler as (event: {
					pathChanged: boolean
					fromLocation?: unknown
				}) => void
				return unsubscribeResolvedMock
			}

			return vi.fn()
		})

		useRouterMock.mockReturnValue({
			subscribe: subscribeMock,
		})

		useLenisMock.mockReturnValue(lenisMock)
	})

	test('subscribes to navigation lifecycle events', () => {
		renderHook(() => useRouteScrollTop())

		expect(subscribeMock).toHaveBeenCalledWith(
			'onBeforeNavigate',
			expect.any(Function),
		)
		expect(subscribeMock).toHaveBeenCalledWith(
			'onResolved',
			expect.any(Function),
		)
	})

	test('stops inertia before path-changing navigation', () => {
		renderHook(() => useRouteScrollTop())

		beforeNavigateHandler?.({ pathChanged: true, fromLocation: { href: '/' } })

		expect(lenisMock.stop).toHaveBeenCalledTimes(1)
	})

	test('smoothly scrolls to top after path-changing navigation resolves', () => {
		renderHook(() => useRouteScrollTop())

		resolvedHandler?.({ pathChanged: true, fromLocation: { href: '/' } })

		expect(lenisMock.start).toHaveBeenCalledTimes(1)
		expect(lenisMock.scrollTo).toHaveBeenCalledWith(0, {
			duration: 0.945,
			easing: expect.any(Function),
			force: true,
		})
	})

	test('ignores navigations that do not change path', () => {
		renderHook(() => useRouteScrollTop())

		beforeNavigateHandler?.({ pathChanged: false, fromLocation: { href: '/' } })
		resolvedHandler?.({ pathChanged: false, fromLocation: { href: '/' } })

		expect(lenisMock.stop).not.toHaveBeenCalled()
		expect(lenisMock.start).not.toHaveBeenCalled()
		expect(lenisMock.scrollTo).not.toHaveBeenCalled()
	})

	test('ignores initial resolve when fromLocation is missing', () => {
		renderHook(() => useRouteScrollTop())

		resolvedHandler?.({ pathChanged: true })

		expect(lenisMock.start).not.toHaveBeenCalled()
		expect(lenisMock.scrollTo).not.toHaveBeenCalled()
	})

	test('unsubscribes listeners on cleanup', () => {
		const { unmount } = renderHook(() => useRouteScrollTop())

		unmount()

		expect(unsubscribeBeforeNavigateMock).toHaveBeenCalledTimes(1)
		expect(unsubscribeResolvedMock).toHaveBeenCalledTimes(1)
	})
})
