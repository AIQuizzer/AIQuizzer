import { Lobby } from "../../convex/quiz"

import { Button } from "./ui/Button"
import { api } from "../../convex/_generated/api"
import { useQuery, useMutation } from "convex/react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

interface LeaderboardProps {
	lobby: Lobby | undefined
	numberOfQuestions: number
}

export function Leaderboard({ lobby, numberOfQuestions }: LeaderboardProps) {
	const navigate = useNavigate()
	const { user } = useAuth0()
	const game = useQuery(api.queries.getGame, { lobbyId: lobby?._id })
	const leaveLobby = useMutation(api.mutations.leaveLobby)
	const restartGame = useMutation(api.mutations.restartGame)

	const placeColors = ["bg-[#D4C000]", "bg-[#C0C0C0]", "bg-[#CD7F32]"]
	const userId = user?.sub
	const players = game?.players.sort((a, b) => b.score - a.score)

	useEffect(() => {
		if (lobby) {
			if (!lobby.gameId) {
				navigate(`/lobby/${lobby._id}`)
				navigate(0)
			}
		}
	}, [lobby])

	async function handleExit() {
		if (!lobby || !userId) return

		await leaveLobby({ lobbyId: lobby._id, playerId: userId })
		navigate("/home")
	}

	function handleRestart() {
		if (lobby?._id) {
			restartGame({ lobbyId: lobby._id })
			navigate(`/lobby/${lobby._id}`)
			navigate(0)
		} else {
			navigate("/lobbies")
		}
	}

	return (
		<div className="flex items-center justify-center">
			<div>
				<h1 className="mb-5 text-4xl font-bold">
					Leaderboard of {lobby?.name}
				</h1>
				<ul>
					{players?.map((player, index) => {
						const place = index + 1

						const backgroundColor = placeColors[index] || ""
						const color = place <= 3 ? "text-white" : ""

						return (
							<li
								key={player.id}
								className="mb-3 flex w-[50vw] items-center border-[1px] border-gray-500 px-4 py-2"
							>
								<span
									className={`
									mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-full text-gray-500 ${backgroundColor} ${color}
									`}
								>
									{index + 1}
								</span>
								<img src={player.img} className="mr-2 h-[50px] w-[50px]" />
								<div className="text-left">
									<p className="font-bold">{player.name}</p>
									<span>
										{player.score}/{numberOfQuestions}
									</span>
								</div>
							</li>
						)
					})}
				</ul>

				<div className="mt-4 flex justify-between">
					<Button onClick={handleExit} className="px-5 py-1">
						exit
					</Button>
					<Button onClick={handleRestart} className="px-5 py-1">
						play again
					</Button>
				</div>
			</div>
		</div>
	)
}
