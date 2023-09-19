import { useMutation } from "convex/react"
import { useEffect, useMemo, useReducer, useState } from "react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import { Answer, Question as IQuestion, Lobby } from "../../convex/quiz"
import { cn, useUser } from "../lib"
import { LoadingSpinner } from "./LoadingSpinner"
import { Button } from "./ui/Button"
import { ProgressBar } from "./ui/ProgressBar"

interface QuestionProps {
	lobby?: Lobby
	activeQuestion: IQuestion
	onActiveQuestionChange: () => void
}

interface QuestionState {
	areAnswersRevealed: boolean
	hasAnswered: boolean
	chosenAnswer: Answer | null
}

type QuestionsAction =
	| {
			type: "chooseAnswer"
			answer: Answer
	  }
	| {
			type: "answersRevealed"
	  }
	| {
			type: "switchQuestion"
	  }

const questionReducer = (state: QuestionState, action: QuestionsAction) => {
	switch (action.type) {
		case "switchQuestion":
			return {
				areAnswersRevealed: false,
				hasAnswered: false,
				chosenAnswer: null,
			}
		case "answersRevealed":
			return {
				...state,
				hasAnswered: true,
				areAnswersRevealed: true,
			}
		case "chooseAnswer":
			return {
				...state,
				hasAnswered: true,
				chosenAnswer: action.answer,
			}
		default:
			return state
	}
}

export function Question({
	lobby,
	activeQuestion,
	onActiveQuestionChange,
}: QuestionProps) {
	const [{ areAnswersRevealed, hasAnswered, chosenAnswer }, dispatch] =
		useReducer(questionReducer, {
			areAnswersRevealed: false,
			hasAnswered: false,
			chosenAnswer: null,
		})

	const [progressBarKey, setProgressBarKey] = useState(1)
	const forceRerenderProgressBar = () =>
		setProgressBarKey((prevKey) => prevKey + 1)

	const addPoint = useMutation(api.mutations.addPoint)
	const user = useUser()

	const audio = useMemo(
		() =>
			new Audio(
				"https://az779572.vo.msecnd.net/res/sounds/src/themes/block/sounds-2021-10/blockchipfail.mp3%7C1-c_qu9e0jxdjwunock6qeg2.mp3",
			),
		[],
	)

	const playerId = user.id
	const gameId = lobby?.gameId as Id<"games">

	useEffect(() => {
		if (activeQuestion.correctAnswerId !== chosenAnswer?.id) return

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		addPoint({ gameId, playerId })
	}, [chosenAnswer])

	const answerStyles = [
		"bg-[#208110] hover:bg-[#339b28]",
		"bg-[#0e508e] hover:bg-[#2d6aa9]",
		"bg-[#b91730] hover:bg-[#dc263f]",
		"bg-[#d89e00] hover:bg-[#f6ad0b]",
	]

	function handleOptionChoose(answer: Answer) {
		dispatch({ type: "chooseAnswer", answer })
	}

	useEffect(() => {
		const MS_TO_ANSWER_QUESTION = 10_000

		const correctAnswerTimeout = setTimeout(async () => {
			dispatch({ type: "answersRevealed" })

			if (activeQuestion.correctAnswerId === chosenAnswer?.id) {
				await audio.play()
			}

			const MS_TO_SWITCH_QUESTION = 5000

			const switchQuestionTimeout = setTimeout(() => {
				dispatch({ type: "switchQuestion" })

				onActiveQuestionChange()

				forceRerenderProgressBar()
			}, MS_TO_SWITCH_QUESTION)

			return () => clearTimeout(switchQuestionTimeout)
		}, MS_TO_ANSWER_QUESTION)

		return () => clearTimeout(correctAnswerTimeout)
	}, [activeQuestion])

	return activeQuestion ? (
		<>
			<div className="mb-1 h-[20px] overflow-hidden rounded-md border-[1px] border-black">
				<ProgressBar key={progressBarKey} />
			</div>

			<h1 className="mb-5 inline-block p-4 text-3xl font-bold  sm:mb-16 sm:text-5xl">
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
		<>
			<LoadingSpinner />
			<span className="sr-only">Loading the question...</span>
		</>
	)
}
