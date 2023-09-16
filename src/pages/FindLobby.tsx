import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import userPlaceholder from "../assets/userplaceholder.png"
import { LoadingSpinner } from "../components/LoadingSpinner"

const Lobbies = () => {
	const { user } = useAuth0()
	const joinLobby = useMutation(api.mutations.joinLobby)
	const lobbies = useQuery(api.queries.getLobbies)
	const navigate = useNavigate()

	if (!lobbies) {
		return <LoadingSpinner />
	}

	if (lobbies.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center gap-8">
				<h2 className="text-3xl font-semibold">No categories found</h2>
				<Button onClick={() => navigate("/categories")}>
					Create a new one!
				</Button>
			</div>
		)
	}

	return (
		<ul className="flex flex-col items-center justify-center gap-4">
			{lobbies.map((lobby) => (
				<li
					key={lobby._id}
					className="border-20 flex items-center justify-center gap-14 rounded-lg bg-neutral-200 p-4"
				>
					<h2>{lobby.name}</h2>
					<div className="flex gap-2">
						{Array.from({ length: lobby.maxPlayers }, (_, index) => {
							const player = lobby.players[index] ?? {
								id: index,
								img: userPlaceholder,
								name: `Player ${index + 1}`,
							}

							return (
								<Avatar key={player.id}>
									<AvatarImage src={player.img} />
									<AvatarFallback>{player.name}</AvatarFallback>
								</Avatar>
							)
						})}
					</div>
					<p
						aria-label={`Joined ${lobby.players.length} players out of ${lobby.maxPlayers}`}
					>
						{lobby.players.length} / {lobby.maxPlayers}
					</p>

					<Button
						disabled={lobby.players.length === lobby.maxPlayers}
						onClick={async () => {
							if (!user?.sub || !user?.name || !user?.picture) return

							await joinLobby({
								lobbyId: lobby._id,
								player: {
									id: user.sub,
									name: user.name,
									img: user.picture,
								},
							})

							navigate(`/lobby/${lobby._id}`)
						}}
					>
						Join
					</Button>
				</li>
			))}
		</ul>
	)
}

export const FindLobby = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-8">
			<h1>Find Lobby</h1>
			<Lobbies />
		</div>
	)
}
