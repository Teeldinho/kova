import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/shared/lib/cn'

const alertVariants = cva(
	'relative w-full rounded-none border px-4 py-3 text-xs [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:size-4 [&>svg~*]:pl-7',
	{
		variants: {
			variant: {
				default: 'border-border bg-card text-card-foreground',
				destructive:
					'border-destructive/40 bg-destructive/5 text-destructive [&>svg]:text-destructive',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	)
}

function AlertTitle({ className, ...props }: React.ComponentProps<'h5'>) {
	return (
		<h5
			data-slot="alert-title"
			className={cn(
				'font-mono text-[10px] font-black uppercase tracking-[0.2em]',
				className,
			)}
			{...props}
		/>
	)
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				'mt-2 font-mono text-[10px] leading-relaxed tracking-[0.12em] uppercase text-muted-foreground',
				className,
			)}
			{...props}
		/>
	)
}

export { Alert, AlertDescription, AlertTitle }
