import { withAuthenticationRequired } from "@auth0/auth0-react"
import { Redirect } from "../components/Redirect"

import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const _MainMenu = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-8">
			<h1>Main Menu</h1>

			<Button asChild>
				<Link to="/lobbies">Find lobby</Link>
			</Button>
			<Button variant="secondary">
				<Link to="/categories">Create lobby</Link>
			</Button>
		</div>
	)
}

export const MainMenu = withAuthenticationRequired(_MainMenu, {
	onRedirecting: () => <Redirect />,
})