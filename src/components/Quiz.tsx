import { useState } from "react"
import { Lobby, Question as QuestionType } from "../../convex/quiz"
import Leaderboard from "./Leaderboard"
import { Question } from "./Question"

interface QuizProps {
	lobby: Lobby | undefined
	questions: QuestionType[]
}

export function Quiz({ lobby, questions }: QuizProps) {
	const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

	const activeQuestion = questions[activeQuestionIndex]

	return (
		<div className="flex items-center justify-center px-4 py-4">
			<div className="w-full text-center">
				{activeQuestion ? (
					<Question
						lobby={lobby}
						activeQuestion={activeQuestion}
						onActiveQuestionChange={() =>
							setActiveQuestionIndex((prevIndex) => prevIndex + 1)
						}
					/>
				) : (
					<Leaderboard lobby={lobby} numberOfQuestions={questions.length} />
				)}
			</div>
		</div>
	)
}
