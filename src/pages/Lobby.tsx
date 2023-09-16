import { withAuthenticationRequired } from "@auth0/auth0-react"
import { Redirect } from "../components/Redirect"
import { useState, useEffect } from "react"
import { Quiz } from "../components/Quiz"
import { useAction } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Question } from "../types/quiz"
import { Lobby } from "../components/Lobby"

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

	useEffect(() => {
		async function get() {
			const res = await getQuestions({
				topic: "react",
			})
			setQuestions(res.questions)
		}
		get()
	}, [])

	return hasStarted ? (
		<Quiz questions={questions} />
	) : (
		<Lobby onStart={() => setHasStarted(true)} />
	)
}

export const LobbyPage = withAuthenticationRequired(_Lobby, {
	onRedirecting: () => <Redirect />,
})
