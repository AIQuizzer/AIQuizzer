import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { useAction, useQuery, useMutation } from "convex/react"
import { useEffect, useState } from "react"
import { api } from "../../convex/_generated/api"
import { Question } from "../../convex/quiz"
import { Lobby } from "../components/Lobby"
import { Quiz } from "../components/Quiz"
import { Redirect } from "../components/Redirect"
import { useNavigate, useParams } from "react-router-dom"
import { Id } from "../../convex/_generated/dataModel"

export function _Lobby() {
	const [questions, setQuestions] = useState<Question[]>([])
	const [hasStarted, setHasStarted] = useState(false)

	const navigate = useNavigate()
	const params = useParams()
	const lobbyId = params.lobbyId as Id<"lobbies">

	const getQuestions = useAction(api.quiz.getQuestions)
	const createGame = useMutation(api.mutations.createGame)
	const lobby = useQuery(api.queries.getLobby, { lobbyId: lobbyId! })
	const joinLobby = useMutation(api.mutations.joinLobby)

	const { user } = useAuth0()

	useEffect(() => {
		// start game for all users in that lobby
		if (lobby?.gameId) {
			setHasStarted(true)
		}

		// user can join by pasting link
		if (lobby) {
			const playerInLobby = lobby.players.find(
				(player) => player.id === user?.sub,
			)

			if (!playerInLobby) {
				if (!user) {
					navigate("/")
				}

				joinLobby({
					lobbyId,
					player: {
						id: user?.sub || "",
						img: user?.picture || "",
						name: user?.name || "",
					},
				})
			}
		}
	}, [lobby])

	useEffect(() => {
		async function get() {
			const res = await getQuestions({
				topic: "react",
			})
			setQuestions(res)
		}
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		get()
	}, [])

	function handleQuizStart() {
		setHasStarted(true)
		createGame({ lobbyId })
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
