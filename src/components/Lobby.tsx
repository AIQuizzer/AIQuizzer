import { useMutation, useQuery } from "convex/react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../convex/_generated/api"
import { Lobby as TLobby } from "../../convex/quiz"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { Button } from "./ui/Button"

import { Id } from "../../convex/_generated/dataModel"
import { useUser } from "../lib"
import { LoadingSpinner } from "./LoadingSpinner"

interface LobbyProps {
	isLoadingQuestions: boolean
	lobby?: TLobby
	onStart: () => void
}

const LobbyContent = ({
	lobby,
	isLoadingQuestions,
	onStart,
	handleLobbyLeave,
}: LobbyProps & {
	handleLobbyLeave: () => void
}) => {
	return (
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

			<div className="flex flex-col items-center justify-center gap-4">
				{isLoadingQuestions && (
					<div className="flex">
						<LoadingSpinner />
						<p className="text-xl font-bold">Loading questions...</p>
					</div>
				)}
				<Button
					disabled={isLoadingQuestions}
					onClick={onStart}
					className="px-9 py-5 text-xl font-bold xs:px-12 xs:py-6"
				>
					Start
				</Button>

				<Button
					onClick={handleLobbyLeave}
					variant="outline"
					className="mt-8 flex items-center justify-center px-8 py-4 text-xl font-bold xs:px-12 xs:py-6 sm:hidden "
				>
					Leave
				</Button>
			</div>
		</>
	)
}

export function Lobby(props: LobbyProps) {
	const navigate = useNavigate()
	const user = useUser()
	const mutateLeaveLobby = useMutation(api.mutations.leaveLobby)

	const params = useParams()
	const lobbyId = (params.lobbyId ?? "") as Id<"lobbies">

	const lobby = useQuery(api.queries.getLobby, { lobbyId })

	const leaveLobby = async () => {
		const playerId = lobby?.players.find((player) => player.id === userId)?.id

		if (!lobby || !playerId) {
			return
		}

		await mutateLeaveLobby({ lobbyId: lobby._id, playerId })
	}

	const userId = user?.id

	async function handleLobbyLeave() {
		await leaveLobby()
		navigate("/lobbies")
	}

	const lobbyContentProps = {
		...props,
		handleLobbyLeave,
	}

	return (
		<div className="align-center relative flex min-h-[calc(100%-70px)] justify-center p-6">
			<div className="text-center">
				{lobby ? <LobbyContent {...lobbyContentProps} /> : <LoadingSpinner />}

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
