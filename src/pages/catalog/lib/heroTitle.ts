export interface HeroTitleCharacter {
	character: string
	id: string
	isSpace: boolean
}

export const createHeroTitleCharacters = (
	title: string,
): HeroTitleCharacter[] =>
	Array.from(title).map((character, index) => ({
		character,
		id: `hero-letter-${index}`,
		isSpace: character === ' ',
	}))
