import { withAuthenticationRequired } from "@auth0/auth0-react"
import { Redirect } from "../components/Redirect"
import { useState } from "react"
import { Quiz } from "../components/Quiz"

export function Lobby() {
	const [hasStarted, setHasStarted] = useState(false)

	const DUMMY_USERS = [
		{
			id: "1",
			image:
				"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
			name: "User 1",
		},
		{
			id: "2",
			image:
				"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
			name: "User 2",
		},
		{
			id: "3",
			image:
				"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
			name: "User 3",
		},
		{
			id: "4",
			image:
				"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
			name: "User 4",
		},
		{
			id: "5",
			image:
				"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
			name: "User 5",
		},
		{
			id: "6",
			image:
				"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
			name: "User 6",
		},
		{
			id: "7",
			image:
				"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
			name: "User 7",
		},
	]

	const lobby = (
		<div className="align-center relative flex min-h-[calc(100%-70px)] justify-center p-7">
			<div className="text-center">
				<h1 className="mb-2 text-5xl font-bold">Geography</h1>
				<h3 className="mb-10 text-2xl">7/10 players</h3>

				<ul className="xs:grid-cols-3 mb-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
					{DUMMY_USERS.map((user) => (
						<li
							key={user.id}
							className="flex flex-col items-center justify-center"
						>
							<img
								src={user.image}
								className="h-[100px] w-[100px] sm:h-[120px] sm:w-[120px]"
							/>
							<p>{user.name}</p>
						</li>
					))}
				</ul>
				<button
					onClick={() => setHasStarted(true)}
					className="border-[1px] border-black px-3 py-1"
				>
					start
				</button>
			</div>
			<button className="fixed bottom-[2%] right-[5%] rounded-md border-[1px] border-black bg-white px-5 py-1 hover:bg-gray-800 hover:text-white">
				Leave
			</button>
		</div>
	)

	return hasStarted ? <Quiz /> : lobby
}

export const LobbyPage = withAuthenticationRequired(Lobby, {
	onRedirecting: () => <Redirect />,
})
