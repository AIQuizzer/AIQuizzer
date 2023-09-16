import { useState, useEffect } from "react"
import { ProgressBar } from "./ui/ProgressBar"
import { Answer } from "../types/quiz"
import { Question as QuestionType } from "../types/quiz"
import { Button } from "../ui/button"
import { cn } from "../lib"

interface QuestionProps {
	activeQuestion: QuestionType
	onActiveQuestionChange: () => void
}

export function Question({
	activeQuestion,
	onActiveQuestionChange,
}: QuestionProps) {
	const [hasAnswered, setHasAnwered] = useState(false)
	const [chosenAnswer, setChosenAnswer] = useState<Answer | null>(null)
	const [progressBarKey, setProgressBarKey] = useState(1)

	const answerStyles = [
		"bg-[#208110] hover:bg-[#339b28]",
		"bg-[#0e508e] hover:bg-[#2d6aa9]",
		"bg-[#b91730] hover:bg-[#dc263f]",
		"bg-[#d89e00] hover:bg-[#f6ad0b]",
	]

	function handleOptionChoose(answer: Answer) {
		setChosenAnswer(answer)
		setHasAnwered(true)
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setHasAnwered(true)
			const correctAnswerTimeout = setTimeout(() => {
				setChosenAnswer(null)
				setHasAnwered(false)
				onActiveQuestionChange()
				setProgressBarKey((prevKey) => prevKey + 1)
			}, 5_000)

			return () => {
				clearTimeout(correctAnswerTimeout)
			}
		}, 10_000)

		return () => {
			clearTimeout(timeout)
		}
	}, [activeQuestion])

	return (
		<>
			<div className="mb-1 h-[20px] overflow-hidden rounded-md border-[1px] border-black">
				<ProgressBar key={progressBarKey} />
			</div>

			<h1 className="mb-5 inline-block bg-white p-4 text-3xl font-bold sm:mb-16 sm:text-5xl">
				{activeQuestion?.value}
			</h1>

			<ul className="grid w-full grid-cols-1 gap-x-[2%] gap-y-2 sm:grid-cols-2 sm:gap-y-[6%]">
				{activeQuestion?.answers?.map((answer: Answer, index: number) => {
					const isChosenByUser = answer.id === chosenAnswer?.id

					const isAnswerCorrect =
						hasAnswered && answer.id === activeQuestion.correctAnswerId
					const isAnswerIncorrect = !isAnswerCorrect && isChosenByUser

					return (
						<Button
							key={answer.id}
							disabled={hasAnswered}
							className={cn(
								`flex appearance-none items-center justify-center py-[15%] sm:py-[25%] lg:py-[17%] ${answerStyles[index]}`,
								isAnswerCorrect &&
									"bg-green-600 hover:bg-green-700 disabled:opacity-100",
								isAnswerIncorrect &&
									"bg-red-600 hover:bg-red-700 disabled:opacity-100",
							)}
							onClick={() => handleOptionChoose(answer)}
						>
							<h3 className="text-xl font-bold text-white sm:text-3xl">
								{answer.value}
							</h3>
						</Button>
					)
				})}
			</ul>
		</>
	)
}
