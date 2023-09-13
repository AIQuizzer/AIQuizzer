import { useState, useEffect } from "react"
import { ProgressBar } from "./ui/ProgressBar"
import { Answer } from "../types/quiz"
import { Question as QuestionType } from "../types/quiz"

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
			<div className="relative mb-5 h-[30px] w-full overflow-hidden rounded-xl border-[1px] border-black">
				<ProgressBar key={progressBarKey} />
			</div>

			<h1 className="mb-5 inline-block bg-white p-4 text-3xl font-bold sm:mb-16 sm:text-5xl">
				{activeQuestion?.value}
			</h1>

			<ul className="grid w-full grid-cols-1 gap-x-[2%] gap-y-2 sm:grid-cols-2 sm:gap-y-[6%]">
				{activeQuestion?.answers?.map((answer: Answer, index: number) => {
					let backgroundColor =
						index === 0
							? "#26890c"
							: index === 1
							? "#1368ce"
							: index === 2
							? "#e21b3c"
							: "#d89e00"

					const isAnswerCorrect = answer.id === activeQuestion.correctAnswerId
					const isChosenByUser = answer.id === chosenAnswer?.id

					if (hasAnswered) {
						if (isAnswerCorrect) {
							backgroundColor = "green"
						}

						if (!isAnswerCorrect && isChosenByUser) {
							backgroundColor = "red"
						}
					}

					const opacity =
						(hasAnswered &&
							(isAnswerCorrect || (!isAnswerCorrect && isChosenByUser))) ||
						!hasAnswered
							? "1"
							: "0.5"

					return (
						<button
							key={answer.id}
							disabled={hasAnswered}
							className={`flex items-center justify-center rounded-md py-[15%] opacity-100 hover:opacity-80`}
							style={{
								backgroundColor: backgroundColor,
								cursor: hasAnswered ? "not-allowed" : "pointer",
								opacity: opacity,
							}}
							onClick={() => handleOptionChoose(answer)}
						>
							{/* change max width in characters */}
							<h3 className="text-xl font-bold text-white sm:text-3xl">
								{answer.value}
							</h3>
						</button>
					)
				})}
			</ul>
		</>
	)
}
