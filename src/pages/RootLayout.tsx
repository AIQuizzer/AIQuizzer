import { useAuth0 } from "@auth0/auth0-react"
import { Outlet } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

export function RootLayout() {
	const { user, logout } = useAuth0()

	return (
		<>
			<nav className="relative z-10 flex h-[70px] items-center justify-around bg-yellow-500 text-gray-100">
				<p className="text-xl">AIQuizzer</p>
				{user && (
					<div className="flex items-center gap-4">
						<Avatar>
							<AvatarImage src={user.picture} />
							<AvatarFallback>{user.name}</AvatarFallback>
						</Avatar>
						<p>{user.name}</p>
						<Button onClick={() => logout()}>Logout</Button>
					</div>
				)}
			</nav>
			<Outlet />
		</>
	)
}
