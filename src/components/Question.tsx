import { useState, useEffect } from "react"

interface Question {
	id: string
	value: string
	answers: {
		id: string
		value: string
	}[]
	correctAnswerId: string
}

export function Question({ activeQuestion, onActiveQuestionChange }: any) {
	const [score, setScore] = useState(0)
	const [progressBarWidth, setProgressBarWidth] = useState(100)
	const [hasAnswered, setHasAnwered] = useState(false)

	function handleOptionChoose(answerId: string) {
		const isAnswerCorrect = activeQuestion.correctAnswerId === answerId

		if (isAnswerCorrect) {
			setScore((prevScore) => prevScore + 1)
		}

		setHasAnwered(true)
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setProgressBarWidth(100)
			onActiveQuestionChange((prevIndex: number) => prevIndex + 1)
			setHasAnwered(false)
		}, 10_000)

		const interval = setInterval(() => {
			setProgressBarWidth((prevWidth) => prevWidth - 0.1)
		}, 10)

		return () => {
			clearInterval(interval)
			clearTimeout(timeout)
		}
	}, [activeQuestion])

	return (
		<>
			<div className="relative mb-5 h-[30px] w-full overflow-hidden rounded-xl border-[1px] border-black">
				<div
					className="bg-red-500"
					style={{ width: `${progressBarWidth}%`, height: "100%" }}
				/>
			</div>

			<h1 className="mb-5 inline-block bg-white p-4 text-3xl font-bold sm:mb-16 sm:text-5xl">
				{activeQuestion?.value}
			</h1>

			<ul className="grid w-full grid-cols-1 gap-x-[2%] gap-y-2 sm:grid-cols-2 sm:gap-y-[6%]">
				{activeQuestion?.answers?.map((answer: any, index: any) => {
					const backgroundColor =
						index === 0
							? "#26890c"
							: index === 1
							? "#1368ce"
							: index === 2
							? "#e21b3c"
							: "#d89e00"

					return (
						<button
							key={answer.id}
							disabled={hasAnswered}
							className="flex items-center justify-center rounded-md py-[15%] hover:opacity-80"
							style={{
								backgroundColor: backgroundColor,
								opacity: hasAnswered ? "0.6" : "",
								cursor: hasAnswered ? "not-allowed" : "pointer",
							}}
							onClick={() => handleOptionChoose(answer.id)}
						>
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
