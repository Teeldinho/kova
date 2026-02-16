import { describe, expect, test } from 'vitest'

import { cn } from './cn'

describe('cn', () => {
	test('merges class names', () => {
		expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
	})

	test('resolves tailwind conflicts', () => {
		expect(cn('px-2', 'px-4')).toBe('px-4')
	})
})
