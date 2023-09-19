import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar"
import { Button } from "../components/ui/Button"

import { useNavigate } from "react-router-dom"
import userPlaceholder from "../assets/userplaceholder.png"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useUser } from "../lib"

const Lobbies = () => {
	const player = useUser()
	const joinLobby = useMutation(api.mutations.joinLobby)
	const lobbies = useQuery(api.queries.getLobbies)
	const navigate = useNavigate()

	if (!lobbies) {
		return <LoadingSpinner />
	}

	if (lobbies.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center gap-8">
				<h2 className="text-3xl font-semibold">No lobbies found</h2>
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
					className="border-20 flex items-center justify-center gap-14 rounded-lg bg-gray-300 p-4 shadow-sm shadow-black dark:bg-slate-800 dark:text-white"
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
									<AvatarImage src={player.img} className="bg-white" />
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
							await joinLobby({
								lobbyId: lobby._id,
								player,
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
			<Lobbies />
		</div>
	)
}
