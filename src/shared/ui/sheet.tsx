import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/shared/lib/cn'

function Sheet({ ...props }: React.ComponentProps<typeof Dialog.Root>) {
	return <Dialog.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
	...props
}: React.ComponentProps<typeof Dialog.Trigger>) {
	return <Dialog.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: React.ComponentProps<typeof Dialog.Close>) {
	return <Dialog.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: React.ComponentProps<typeof Dialog.Portal>) {
	return <Dialog.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
	className,
	...props
}: React.ComponentProps<typeof Dialog.Overlay>) {
	return (
		<Dialog.Overlay
			data-slot="sheet-overlay"
			className={cn(
				'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
				className,
			)}
			{...props}
		/>
	)
}

const sheetVariants = cva(
	'fixed z-50 bg-background p-6 shadow-lg transition data-[state=open]:animate-in data-[state=closed]:animate-out duration-300',
	{
		variants: {
			side: {
				top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
				bottom:
					'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
				left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
				right:
					'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
			},
		},
		defaultVariants: {
			side: 'right',
		},
	},
)

interface SheetContentProps
	extends React.ComponentProps<typeof Dialog.Content>,
		VariantProps<typeof sheetVariants> {}

function SheetContent({
	className,
	children,
	side = 'right',
	...props
}: SheetContentProps) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<Dialog.Content
				data-slot="sheet-content"
				className={cn(sheetVariants({ side }), className)}
				{...props}
			>
				{children}
				<Dialog.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
					<X size={16} />
					<span className="sr-only">Close</span>
				</Dialog.Close>
			</Dialog.Content>
		</SheetPortal>
	)
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sheet-header"
			className={cn(
				'flex flex-col gap-1.5 text-center sm:text-left',
				className,
			)}
			{...props}
		/>
	)
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn(
				'mt-auto flex flex-col gap-2 sm:flex-row sm:justify-end',
				className,
			)}
			{...props}
		/>
	)
}

function SheetTitle({
	className,
	...props
}: React.ComponentProps<typeof Dialog.Title>) {
	return (
		<Dialog.Title
			data-slot="sheet-title"
			className={cn(
				'font-mono text-lg font-bold uppercase tracking-wider',
				className,
			)}
			{...props}
		/>
	)
}

function SheetDescription({
	className,
	...props
}: React.ComponentProps<typeof Dialog.Description>) {
	return (
		<Dialog.Description
			data-slot="sheet-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
}

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
}
