import { Link } from "react-router-dom"
import { Button } from "../ui/button"

export const MainMenu = () => {
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
