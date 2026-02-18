import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/cn'

const buttonVariants = cva(
	"focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-none border-2 border-transparent bg-clip-padding text-[10px] font-mono uppercase tracking-widest focus-visible:ring-1 aria-invalid:ring-1 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none active:scale-[0.97]",
	{
		variants: {
			variant: {
				default:
					'bg-primary text-background border-primary hover:bg-transparent hover:text-primary',
				outline:
					'border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background dark:border-foreground dark:text-foreground dark:hover:bg-foreground dark:hover:text-background',
				secondary:
					'bg-secondary text-secondary-foreground border-secondary hover:bg-transparent hover:text-secondary-foreground',
				ghost:
					'hover:bg-accent hover:text-accent-foreground border-transparent hover:border-border',
				destructive:
					'bg-destructive text-destructive-foreground border-destructive hover:bg-transparent hover:text-destructive',
				link: 'text-primary underline-offset-4 hover:underline border-none',
			},
			size: {
				default:
					'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
				xs: "h-6 gap-1 rounded-none px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-7 gap-1 rounded-none px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
				lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
				icon: 'size-8',
				'icon-xs': "size-6 rounded-none [&_svg:not([class*='size-'])]:size-3",
				'icon-sm': 'size-7 rounded-none',
				'icon-lg': 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

function Button({
	className,
	variant = 'default',
	size = 'default',
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
