import { useDecryptText } from '@/shared/model'

interface DecryptTextProps {
	text: string
	className?: string
	delay?: number
}

export function DecryptText({
	text,
	className = '',
	delay = 0,
}: DecryptTextProps) {
	const displayText = useDecryptText({ delay, text })

	return <span className={className}>{displayText}</span>
}
