import Leaderboard from "./Leaderboard"
import { Question } from "./Question"
import { useState } from "react"

const DUMMY_ANSWERS = [
	{ id: "a", value: "Mallorca" },
	{ id: "b", value: "United States" },
	{ id: "c", value: "Germany" },
	{ id: "d", value: "England" },
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

export function Quiz() {
	const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

	const activeQuestion = DUMMY_QUESTIONS[activeQuestionIndex]

	return (
		<div className="flex items-center justify-center px-4 py-4">
			<div className="w-full text-center">
				{activeQuestion ? (
					<Question
						activeQuestion={activeQuestion}
						onActiveQuestionChange={(value: number) =>
							setActiveQuestionIndex(value)
						}
					/>
				) : (
					<Leaderboard numberOfQuestions={DUMMY_QUESTIONS.length} />
				)}
			</div>
		</div>
	)
}
