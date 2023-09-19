import { useAuth0 } from "@auth0/auth0-react"
import { Link, Outlet } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar"
import { Button } from "../components/ui/Button"

import { useEffect, useState } from "react"

import MoonIcon from "../assets/moon.svg"
import SunIcon from "../assets/sun.svg"

const useDarkMode = () => {
	const [isDarkMode, setDarkMode] = useState(false)

	useEffect(() => {
		const darkMode = localStorage.getItem("darkMode")

		if (darkMode !== "true") return
		setDarkMode(true)
	}, [])

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark")
			localStorage.setItem("darkMode", "true")
			return
		}

		document.documentElement.classList.remove("dark")
		localStorage.setItem("darkMode", "false")
	}, [isDarkMode])

	return () => setDarkMode(!isDarkMode)
}

export function RootLayout() {
	const { user, isAuthenticated, logout } = useAuth0()
	const toggleDarkMode = useDarkMode()

	return (
		<div className="relative h-[100vh] bg-gray-100 dark:bg-gray-900">
			<nav className="relative z-10 flex h-[70px] items-center justify-around bg-zinc-800 text-gray-100">
				<Link to="/home" className="text-xl font-bold hover:opacity-80">
					AIQuizzer
				</Link>

				<div className="flex items-center gap-4">
					{user && isAuthenticated ? (
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
					) : null}
					<Button onClick={() => toggleDarkMode()} className="ml-6">
						<img
							src={MoonIcon}
							className="h-3.5 w-3.5 dark:hidden"
							alt="Toggle dark mode"
						/>
						<img
							src={SunIcon}
							className="hidden h-3.5 w-3.5 dark:block"
							alt="Toggle light mode"
						/>
						<span className="sr-only">Toggle dark mode</span>
					</Button>
				</div>
			</nav>
			<Outlet />
		</div>
	)
}
