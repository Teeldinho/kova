export const DECRYPT_TEXT_CONFIG = {
	CHARACTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
	CYCLES_PER_CHARACTER: 3,
	INTERVAL_MS: 30,
} as const

export interface CreateDecryptFrameParams {
	previousText: string
	targetText: string
	currentIndex: number
	cycleCount: number
}

const getRandomCharacter = () => {
	const index = Math.floor(
		Math.random() * DECRYPT_TEXT_CONFIG.CHARACTERS.length,
	)

	return DECRYPT_TEXT_CONFIG.CHARACTERS.charAt(index)
}

export const createMaskedText = (text: string) =>
	text.replace(/[^ ]/g, () => getRandomCharacter())

export const createDecryptFrame = ({
	previousText,
	targetText,
	currentIndex,
	cycleCount,
}: CreateDecryptFrameParams) => {
	const chars = previousText.split('')

	for (let index = currentIndex; index < targetText.length; index++) {
		if (targetText[index] === ' ') {
			chars[index] = ' '
			continue
		}

		if (
			index === currentIndex &&
			cycleCount >= DECRYPT_TEXT_CONFIG.CYCLES_PER_CHARACTER
		) {
			chars[index] = targetText[index]
			continue
		}

		chars[index] = getRandomCharacter()
	}

	return chars.join('')
}
