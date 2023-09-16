import Leaderboard from "./Leaderboard"
import { Question } from "./Question"
import { useState } from "react"
import { Question as QuestionType } from "../types/quiz"

export function Quiz({ questions }: { questions: QuestionType[] }) {
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
