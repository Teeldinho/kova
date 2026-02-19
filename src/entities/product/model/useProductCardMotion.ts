import {
	type MotionStyle,
	useMotionValue,
	useSpring,
	useTransform,
} from 'framer-motion'
import { type MouseEvent, useCallback } from 'react'

import { PRODUCT } from '../config/constants'

interface UseProductCardMotionParams {
	hasActionNode: boolean
}

export function useProductCardMotion({
	hasActionNode,
}: UseProductCardMotionParams) {
	const pointerX = useMotionValue(0)
	const pointerY = useMotionValue(0)
	const pointerXSpring = useSpring(pointerX, {
		stiffness: PRODUCT.CARD_TILT_SPRING_STIFFNESS,
		damping: PRODUCT.CARD_TILT_SPRING_DAMPING,
	})
	const pointerYSpring = useSpring(pointerY, {
		stiffness: PRODUCT.CARD_TILT_SPRING_STIFFNESS,
		damping: PRODUCT.CARD_TILT_SPRING_DAMPING,
	})

	const rotateX = useTransform(
		pointerYSpring,
		[-PRODUCT.CARD_TILT_RANGE, PRODUCT.CARD_TILT_RANGE],
		[`${PRODUCT.CARD_TILT_DEGREES}deg`, `-${PRODUCT.CARD_TILT_DEGREES}deg`],
	)
	const rotateY = useTransform(
		pointerXSpring,
		[-PRODUCT.CARD_TILT_RANGE, PRODUCT.CARD_TILT_RANGE],
		[`-${PRODUCT.CARD_TILT_DEGREES}deg`, `${PRODUCT.CARD_TILT_DEGREES}deg`],
	)

	const handleProductCardMouseMove = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			if (hasActionNode) {
				return
			}

			const bounds = event.currentTarget.getBoundingClientRect()

			pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
			pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
		},
		[hasActionNode, pointerX, pointerY],
	)

	const handleProductCardMouseLeave = useCallback(() => {
		if (hasActionNode) {
			return
		}

		pointerX.set(0)
		pointerY.set(0)
	}, [hasActionNode, pointerX, pointerY])

	const cardStyle: MotionStyle | undefined = hasActionNode
		? undefined
		: {
				rotateX,
				rotateY,
				transformStyle: 'preserve-3d',
			}

	return {
		cardStyle,
		handleProductCardMouseLeave,
		handleProductCardMouseMove,
	}
}
