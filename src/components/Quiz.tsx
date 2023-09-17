import { useState } from "react"
import { api } from "../../convex/_generated/api"
import Leaderboard from "./Leaderboard"
import { Question } from "./Question"

type Questions = (typeof api.quiz.getQuestions)["_returnType"]

export function Quiz({ questions }: { questions: Questions }) {
	const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

	const activeQuestion = questions[activeQuestionIndex]

	return (
		<div className="flex items-center justify-center px-4 py-4">
			<div className="w-full text-center">
				{activeQuestion ? (
					<Question
						activeQuestion={activeQuestion}
						onActiveQuestionChange={() =>
							setActiveQuestionIndex((prevIndex) => prevIndex + 1)
						}
					/>
				) : (
					<Leaderboard numberOfQuestions={questions.length} />
				)}
			</div>
		</div>
	)
}
