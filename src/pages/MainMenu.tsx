import { withAuthenticationRequired } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { Redirect } from "../components/Redirect"
import { Button } from "../components/ui/Button"

const _MainMenu = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-8">
			<Button asChild className="p-8 text-xl">
				<Link to="/lobbies">Find lobby</Link>
			</Button>
			<Button asChild className="p-8 text-xl" variant="outline">
				<Link to="/categories">Create lobby</Link>
			</Button>
		</div>
	)
}

export const MainMenu = withAuthenticationRequired(_MainMenu, {
	onRedirecting: () => <Redirect />,
})
