import { Link, Outlet } from "react-router-dom"

export function RootLayout() {
	return (
		<div className="relative h-[100vh] bg-gray-100">
			<nav className="relative z-10 flex h-[70px] items-center justify-center bg-zinc-800 text-gray-100">
				<Link to="/home" className="text-xl font-bold hover:opacity-80">
					AIQuizzer
				</Link>
			</nav>
			<Outlet />
		</div>
	)
}
