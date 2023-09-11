import React from "react"
import ReactDOM from "react-dom/client"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithAuth0 } from "convex/react-auth0"
import { Auth0Provider } from "@auth0/auth0-react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { RootLayout } from "./pages/RootLayout.tsx"
import { WelcomePage } from "./pages/Welcome.tsx"
import { HomePage } from "./pages/Home.tsx"
import { Lobby } from "./pages/Lobby.tsx"
import "./index.css"

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <WelcomePage /> },
			{ path: "home", element: <HomePage /> },
			{ path: "lobby/:lobbyId", element: <Lobby /> },
		],
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Auth0Provider
			domain={import.meta.env.VITE_AUTH0_DOMAIN}
			clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: "http://localhost:5173/home",
			}}
			useRefreshTokens={true}
			cacheLocation="localstorage"
		>
			<ConvexProviderWithAuth0 client={convex}>
				<RouterProvider router={router} />
			</ConvexProviderWithAuth0>
		</Auth0Provider>
	</React.StrictMode>,
)
