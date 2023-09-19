import { useAuth0 } from "@auth0/auth0-react"
import { useConvexAuth } from "convex/react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"

export function WelcomePage() {
	const { loginWithRedirect } = useAuth0()
	const { isAuthenticated } = useConvexAuth()
	const navigate = useNavigate()

	if (isAuthenticated) navigate("/home")

	return (
		<div className="flex items-center justify-center p-20">
			<div className="text-center">
				<h1 className="text-4xl font-bold">Welcome to AiQuizzer</h1>
				<p>Improve your skills by having fun!</p>
				<Button
					onClick={() => loginWithRedirect()}
					className="mx-auto mt-4 w-[90%] py-6 text-lg font-bold hover:bg-gray-300"
				>
					Sign in
				</Button>
			</div>
		</div>
	)
}
