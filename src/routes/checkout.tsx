import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout')({
	component: CheckoutRoute,
})

function CheckoutRoute() {
	return <Outlet />
}
