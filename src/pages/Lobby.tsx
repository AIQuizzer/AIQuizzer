import { withAuthenticationRequired } from "@auth0/auth0-react"
import { useAction, useMutation, useQuery } from "convex/react"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import { Question } from "../../convex/quiz"
import { Lobby } from "../components/Lobby"
import { Quiz } from "../components/Quiz"
import { Redirect } from "../components/Redirect"
import { useUser } from "../lib"

export function _Lobby() {
	const [questions, setQuestions] = useState<Question[]>([])
	const [hasStarted, setHasStarted] = useState(false)

	const params = useParams()
	const lobbyId = (params.lobbyId ?? "") as Id<"lobbies">

	const getQuestions = useAction(api.quiz.getQuestions)
	const createGame = useMutation(api.mutations.createGame)
	const lobby = useQuery(api.queries.getLobby, { lobbyId })
	const joinLobby = useMutation(api.mutations.joinLobby)

	const player = useUser()

	const joinPlayersFromLink = useCallback(async () => {
		if (!lobby) {
			return
		}

		const playerInLobby = lobby.players.find(
			(currentPlayer) => currentPlayer.id === player.id,
		)

		if (playerInLobby) {
			return
		}

		await joinLobby({
			lobbyId,
			player,
		})
	}, [])

	useEffect(() => {
		// start game for all users in that lobby
		if (lobby?.gameId) {
			setHasStarted(true)
		}

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		joinPlayersFromLink()
	}, [lobby])

	useEffect(() => {
		if (!lobby || questions.length > 0) {
			return
		}

		const fetchQuestions = async () => {
			const fetchedQuestions = await getQuestions({
				topic: lobby.name,
			})
			setQuestions(fetchedQuestions)
		}
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchQuestions()
	}, [lobby])

	const handleQuizStart = async () => {
		setHasStarted(true)
		await createGame({ lobbyId })
	}

	return hasStarted ? (
		<Quiz lobby={lobby} questions={questions} />
	) : (
		<Lobby
			isLoadingQuestions={questions.length === 0}
			lobby={lobby}
			onStart={handleQuizStart}
		/>
	)
}

export const LobbyPage = withAuthenticationRequired(_Lobby, {
	onRedirecting: () => <Redirect />,
})
