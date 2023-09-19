import { Lobby as LobbyType } from "../../convex/quiz"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { Button } from "./ui/Button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useAuth0 } from "@auth0/auth0-react"
import { Player } from "../../convex/quiz"
import { LoadingSpinner } from "./LoadingSpinner"

interface LobbyProps {
	isLoadingQuestions: boolean
	lobby: LobbyType | undefined
	onStart: () => void
}

export function Lobby({ isLoadingQuestions, lobby, onStart }: LobbyProps) {
	const navigate = useNavigate()
	const { user } = useAuth0()
	const leaveLobby = useMutation(api.mutations.leaveLobby)

	const userId = user?.sub

	async function handleLobbyLeave() {
		const playerId = lobby?.players.find(
			(player: Player) => player.id === userId,
		)?.id

		if (!lobby || !playerId) {
			return
		}

		await leaveLobby({ lobbyId: lobby._id, playerId: playerId })
		navigate("/lobbies")
	}

	const lobbyContent = (
		<>
			<h1 className="mb-2 text-5xl font-bold">{lobby?.name}</h1>
			<h3 className="mb-10 text-2xl">
				{lobby?.players?.length}/{lobby?.maxPlayers} players
			</h3>

			<ul className="mb-10 flex max-w-lg flex-wrap justify-center gap-8">
				{lobby?.players?.map((player) => (
					<li
						key={player.id}
						className="flex flex-col items-center justify-center"
					>
						<Avatar className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px]">
							<AvatarImage src={player.img} />
							<AvatarFallback>User avatar</AvatarFallback>
						</Avatar>
						<p>{player.name}</p>
					</li>
				))}
			</ul>

			<div className="flex items-center justify-center gap-2">
				<Button
					onClick={handleLobbyLeave}
					className="flex items-center justify-center px-8 py-4 text-xl font-bold xs:px-12 xs:py-6 sm:hidden "
				>
					Leave
				</Button>
				<Button
					disabled={isLoadingQuestions}
					onClick={onStart}
					className="px-9 py-5 text-xl font-bold xs:px-12 xs:py-6"
				>
					Start
				</Button>
				{isLoadingQuestions && <LoadingSpinner />}
			</div>
		</>
	)

	return (
		<div className="align-center relative flex min-h-[calc(100%-70px)] justify-center p-6">
			<div className="text-center">
				{lobby ? lobbyContent : <LoadingSpinner />}

				<Button
					onClick={handleLobbyLeave}
					className="fixed bottom-[5%] right-[5%] hidden px-5 py-1 sm:block sm:py-1"
				>
					Leave
				</Button>
			</div>
		</div>
	)
}
