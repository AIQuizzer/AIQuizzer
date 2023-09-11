import { useAuth0 } from "@auth0/auth0-react"
import { useConvexAuth } from "convex/react"
import { useNavigate } from "react-router-dom"

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
				<button
					onClick={() => loginWithRedirect()}
					className="mx-auto mb-2 mt-5 block w-[90%] rounded-md border-2 px-5 py-3 font-semibold hover:bg-gray-800 hover:text-white"
				>
					Sign in
				</button>
			</div>
		</div>
	)
}
