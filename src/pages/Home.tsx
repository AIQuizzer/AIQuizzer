import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { useConvexAuth } from "convex/react"
import { Redirect } from "../components/Redirect"

function Home() {
	// depending on whether user is logged in with google or credentials we will get slightly different data
	// google => email, email_verified, family_name, given_name, local, name, nickname, picture, sub, updated_at
	// credentials => email, email_verified, name, nickname, name, picture, sub, updated_at
	const { isAuthenticated, isLoading } = useConvexAuth()
	const { user } = useAuth0()

	return <div>Homepage</div>
}

export const HomePage = withAuthenticationRequired(Home, {
	onRedirecting: () => <Redirect />,
})
