import { withAuthenticationRequired } from "@auth0/auth0-react"
import { useAction, useQuery, useMutation } from "convex/react"
import { useEffect, useState } from "react"
import { api } from "../../convex/_generated/api"
import { Question } from "../../convex/quiz"
import { Lobby } from "../components/Lobby"
import { Quiz } from "../components/Quiz"
import { Redirect } from "../components/Redirect"
import { useParams } from "react-router-dom"
import { Id } from "../../convex/_generated/dataModel"

const DUMMY_ANSWERS = [
	{ id: "a", value: "Mallorca" },
	{ id: "b", value: "United States" },
	{ id: "c", value: "Germany" },
	{
		id: "d",
		value: "England",
	},
]

const DUMMY_ANSWERS2 = [
	{ id: "a", value: "Poland" },
	{ id: "b", value: "France" },
	{ id: "c", value: "Austria" },
	{ id: "d", value: "Vatican" },
]

const DUMMY_QUESTIONS = [
	{
		id: "abc",
		value: "What country from listed below is the biggest?",
		answers: DUMMY_ANSWERS,
		correctAnswerId: "b",
	},
	{
		id: "abcd",
		value: "What country from listed below is the smallest?",
		answers: DUMMY_ANSWERS2,
		correctAnswerId: "d",
	},
]

export function _Lobby() {
	const [questions, setQuestions] = useState<Question[]>(DUMMY_QUESTIONS)
	const [hasStarted, setHasStarted] = useState(false)
	const getQuestions = useAction(api.quiz.getQuestions)
	const params = useParams()
	const lobbyId = params.lobbyId as Id<"lobbies">
	const createGame = useMutation(api.mutations.createGame)
	const lobby = useQuery(api.queries.getLobby, { lobbyId: lobbyId! })

	useEffect(() => {
		if (lobby?.gameId) {
			setHasStarted(true)
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
		<Lobby lobby={lobby} onStart={handleQuizStart} />
	)
}

export const LobbyPage = withAuthenticationRequired(_Lobby, {
	onRedirecting: () => <Redirect />,
})
