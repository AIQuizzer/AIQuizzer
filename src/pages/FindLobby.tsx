import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

const lobbies = [
	{
		id: "1",
		name: "Lobby 1",
		players: [
			{
				id: "1",
				name: "Player 1",
				img: "https://picsum.photos/200",
			},
			{
				id: "2",
				name: "Player 2",
				img: "https://picsum.photos/200",
			},
			{
				id: "3",
				name: "Player 1",
				img: "https://picsum.photos/200/",
			},
			{
				id: "4",
				name: "Player 2",
				img: "https://picsum.photos/200",
			},
			{
				id: "5",
				name: "Player 1",
				img: "https://picsum.photos/200/",
			},
		],
		joinedPlayers: 3,
		maxPlayers: 5,
	},
	{
		id: "2",
		name: "Lobby 1",
		players: [
			{
				id: "1",
				name: "Player 1",
				img: "https://picsum.photos/200",
			},
			{
				id: "2",
				name: "Player 2",
				img: "https://picsum.photos/200",
			},
			{
				id: "3",
				name: "Player 1",
				img: "https://picsum.photos/200/",
			},
			{
				id: "4",
				name: "Player 2",
				img: "https://picsum.photos/200",
			},
			{
				id: "5",
				name: "Player 1",
				img: "https://picsum.photos/200/",
			},
		],
		joinedPlayers: 3,
		maxPlayers: 5,
	},
]

export const FindLobby = () => {
	const filteredLobbies = lobbies.filter(
		(lobby) => lobby.joinedPlayers < lobby.maxPlayers,
	)

	return (
		<div className="flex flex-col items-center justify-center gap-8">
			<h1>Find Lobby</h1>
			<ul className="flex flex-col items-center justify-center gap-4">
				{filteredLobbies.map((lobby) => {
					const isFull = lobby.joinedPlayers === lobby.maxPlayers

					return (
						<li
							key={lobby.id}
							className="border-20 flex items-center justify-center gap-14 rounded-lg bg-neutral-200 p-4"
						>
							<h2>{lobby.name}</h2>
							<div className="flex gap-2">
								{lobby.players.map((player) => (
									<Avatar key={player.id}>
										<AvatarImage src={player.img} />
										<AvatarFallback>{player.name}</AvatarFallback>
									</Avatar>
								))}
							</div>
							<p
								aria-label={`Joined ${lobby.joinedPlayers} players out of ${lobby.maxPlayers}`}
							>
								{lobby.joinedPlayers} / {lobby.maxPlayers}
							</p>

							<Button disabled={isFull}>Join</Button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
