import { useAuth0 } from "@auth0/auth0-react"
import { Link, Outlet } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar"
import { Button } from "../components/ui/Button"

export function RootLayout() {
	const { user, logout } = useAuth0()

	return (
		<div className="relative h-[100vh] bg-gray-100">
			<nav className="relative z-10 flex h-[70px] items-center justify-around bg-zinc-800 text-gray-100">
				<Link to="/home" className="text-xl font-bold hover:opacity-80">
					AIQuizzer
				</Link>
				{user && (
					<div className="flex items-center gap-4">
						<Avatar>
							<AvatarImage
								className="hidden xs:inline-block"
								src={user.picture}
							/>
							<AvatarFallback>{user.name}</AvatarFallback>
						</Avatar>
						<p className="hidden xs:inline-block">{user.name}</p>
						<Button onClick={() => logout()}>Logout</Button>
					</div>
				)}
			</nav>
			<Outlet />
		</div>
	)
}
