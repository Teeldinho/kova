import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout')({
	ssr: false,
	component: CheckoutRoute,
})

function CheckoutRoute() {
	return <Outlet />
}
