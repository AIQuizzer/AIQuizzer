import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function ErrorPage() {
	const [timeToRedirect, setTimeToRedirect] = useState(10)

	const navigate = useNavigate()

	useEffect(() => {
		const interval = setInterval(() => {
			if (timeToRedirect < 1) {
				navigate("/home")
			}
			setTimeToRedirect((prevTime) => prevTime - 1)
		}, 1000)

		return () => clearInterval(interval)
	})
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="text-center">
				<h1 className="text-4xl font-bold">An error occured</h1>
				<p className="text-xl">
					You are being redirected to home page in {timeToRedirect}s
				</p>
			</div>
		</div>
	)
}
