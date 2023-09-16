import { useState, useEffect } from "react"

export function ProgressBar() {
	const [progressBarWidth, setProgressBarWidth] = useState(100)

	useEffect(() => {
		const interval = setInterval(() => {
			setProgressBarWidth((prevWidth) => prevWidth - 0.1)
		}, 10)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div
			className={`mb-1 h-full bg-zinc-950`}
			style={{ width: `${progressBarWidth}%` }}
		/>
	)
}
