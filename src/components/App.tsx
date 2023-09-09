import { useState } from "react"
import { Button } from "../ui/button"

function App() {
	const [count, setCount] = useState(0)

	return (
		<div>
			<Button
				className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
				onClick={() => setCount((count) => count + 1)}
			>
				count is {count}
			</Button>
		</div>
	)
}

export { App }
