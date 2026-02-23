import { cn } from '@/shared/lib'

interface SkeletonProps {
	className?: string
}

export function Skeleton({ className }: SkeletonProps) {
	return <div className={cn('animate-pulse bg-secondary/60', className)} />
}
