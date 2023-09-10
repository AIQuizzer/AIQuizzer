import { Outlet } from "react-router-dom"

export function RootLayout() {
	return (
		<>
			<nav className="relative z-10 flex h-[70px] items-center justify-center bg-yellow-500 text-gray-100">
				<p className="text-xl">AIQuizzer</p>
			</nav>
			<Outlet />
		</>
	)
}
