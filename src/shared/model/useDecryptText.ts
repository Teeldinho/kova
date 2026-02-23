import { useEffect, useState } from 'react'

import {
	createDecryptFrame,
	createMaskedText,
	DECRYPT_TEXT_CONFIG,
} from '@/shared/lib'

interface UseDecryptTextParams {
	delay: number
	text: string
}

export function useDecryptText({ delay, text }: UseDecryptTextParams) {
	const [displayText, setDisplayText] = useState(() => createMaskedText(text))

	useEffect(() => {
		setDisplayText(createMaskedText(text))

		let intervalId: ReturnType<typeof setInterval> | undefined

		const timeoutId = setTimeout(() => {
			let currentIndex = 0
			let cycleCount = 0

			intervalId = setInterval(() => {
				setDisplayText((previousText) =>
					createDecryptFrame({
						previousText,
						targetText: text,
						currentIndex,
						cycleCount,
					}),
				)

				cycleCount++

				if (cycleCount > DECRYPT_TEXT_CONFIG.CYCLES_PER_CHARACTER) {
					currentIndex++
					cycleCount = 0
				}

				if (currentIndex >= text.length) {
					clearInterval(intervalId)
				}
			}, DECRYPT_TEXT_CONFIG.INTERVAL_MS)
		}, delay)

		return () => {
			clearTimeout(timeoutId)

			if (intervalId) {
				clearInterval(intervalId)
			}
		}
	}, [delay, text])

	return displayText
}
