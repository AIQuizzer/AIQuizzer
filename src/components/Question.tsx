import { useEffect, useMemo, useState } from "react"
import { ProgressBar } from "./ui/ProgressBar"
import { Answer, Question as IQuestion, Lobby } from "../../convex/quiz"
import { cn } from "../lib"
import { Button } from "./ui/Button"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { useAuth0 } from "@auth0/auth0-react"
import { Id } from "../../convex/_generated/dataModel"
// import useSound from "use-sound"

interface QuestionProps {
	lobby: Lobby | undefined
	activeQuestion: IQuestion
	onActiveQuestionChange: () => void
}

export function Question({
	lobby,
	activeQuestion,
	onActiveQuestionChange,
}: QuestionProps) {
	const [areAnswersRevealed, setAreAnswersRevealed] = useState(false)
	const [hasAnswered, setHasAnswered] = useState(false)
	const [chosenAnswer, setChosenAnswer] = useState<Answer | null>(null)
	const [progressBarKey, setProgressBarKey] = useState(1)
	const addPoint = useMutation(api.mutations.addPoint)
	const { user } = useAuth0()

	const playerId = user?.sub
	const gameId = lobby?.gameId as Id<"games">

	useEffect(() => {
		async function handleAsync() {
			if (!lobby || !playerId) return
			if (!activeQuestion || !chosenAnswer) return

			if (activeQuestion.correctAnswerId === chosenAnswer.id) {
				await addPoint({ gameId, playerId })
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		handleAsync()
	}, [chosenAnswer])

	const answerStyles = [
		"bg-[#208110] hover:bg-[#339b28]",
		"bg-[#0e508e] hover:bg-[#2d6aa9]",
		"bg-[#b91730] hover:bg-[#dc263f]",
		"bg-[#d89e00] hover:bg-[#f6ad0b]",
	]

	function handleOptionChoose(answer: Answer) {
		setChosenAnswer(answer)
		setHasAnswered(true)
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setHasAnswered(true)
			setAreAnswersRevealed(true)

			const correctAnswerTimeout = setTimeout(() => {
				setAreAnswersRevealed(false)
				setChosenAnswer(null)
				setHasAnswered(false)
				onActiveQuestionChange()
				// eslint-disable-next-line max-nested-callbacks
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

	return activeQuestion ? (
		<>
			<div className="mb-1 h-[20px] overflow-hidden rounded-md border-[1px] border-black">
				<ProgressBar key={progressBarKey} />
			</div>

			<h1 className="mb-5 inline-block bg-white p-4 text-3xl font-bold sm:mb-16 sm:text-5xl">
				{activeQuestion?.value}
			</h1>

			<ul className="grid w-full grid-cols-1 gap-x-[2%] gap-y-2 sm:grid-cols-2 sm:gap-y-[6%]">
				{activeQuestion?.answers?.map((answer, index) => {
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
								areAnswersRevealed &&
									isAnswerCorrect &&
									"bg-green-600 hover:bg-green-700 disabled:opacity-100",
								areAnswersRevealed &&
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
	) : (
		<div>loading</div>
	)
}
