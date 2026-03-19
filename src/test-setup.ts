function isStorageLike(storage: unknown): storage is Storage {
	if (!storage || typeof storage !== 'object') {
		return false
	}

	const candidate = storage as Partial<Storage>

	return (
		typeof candidate.getItem === 'function' &&
		typeof candidate.setItem === 'function' &&
		typeof candidate.removeItem === 'function' &&
		typeof candidate.clear === 'function' &&
		typeof candidate.key === 'function'
	)
}

function createMemoryStorage(): Storage {
	const store = new Map<string, string>()

	return {
		get length() {
			return store.size
		},
		clear() {
			store.clear()
		},
		getItem(key: string) {
			return store.has(key) ? (store.get(key) ?? null) : null
		},
		key(index: number) {
			return Array.from(store.keys())[index] ?? null
		},
		removeItem(key: string) {
			store.delete(key)
		},
		setItem(key: string, value: string) {
			store.set(key, String(value))
		},
	}
}

function resolveStorage(): Storage {
	if (typeof window !== 'undefined') {
		try {
			if (isStorageLike(window.localStorage)) {
				return window.localStorage
			}
		} catch {
			// Ignore SecurityError and fall back to memory storage.
		}
	}

	if (isStorageLike(globalThis.localStorage)) {
		return globalThis.localStorage
	}

	return createMemoryStorage()
}

const localStorageShim = resolveStorage()

Object.defineProperty(globalThis, 'localStorage', {
	configurable: true,
	writable: true,
	value: localStorageShim,
})

if (typeof window !== 'undefined') {
	Object.defineProperty(window, 'localStorage', {
		configurable: true,
		writable: true,
		value: localStorageShim,
	})
}
