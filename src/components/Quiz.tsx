import { useState, useEffect } from "react"
import { Lobby, Question as QuestionType } from "../../convex/quiz"
import { Leaderboard } from "./Leaderboard"
import { Question } from "./Question"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { Id } from "../../convex/_generated/dataModel"

interface QuizProps {
	lobby: Lobby | undefined
	questions: QuestionType[]
}

export function Quiz({ lobby, questions }: QuizProps) {
	const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
	const activeQuestion = questions[activeQuestionIndex]
	const updateGame = useMutation(api.mutations.updateGame)

	useEffect(() => {
		// update activeQuestion in game document
		async function update() {
			if (lobby?.gameId) {
				await updateGame({
					gameId: lobby?.gameId as Id<"games">,
					activeQuestion: activeQuestion,
				})
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		update()
	}, [lobby, activeQuestionIndex])

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
