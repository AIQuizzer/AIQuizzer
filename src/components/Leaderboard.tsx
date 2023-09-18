import { Lobby } from "../../convex/quiz"
import { Button } from "./ui/Button"

interface LeaderboardProps {
	lobby: Lobby | undefined
	numberOfQuestions: number
}

export default function Leaderboard({
	lobby,
	numberOfQuestions,
}: LeaderboardProps) {
	const placeColors = ["#D4C000", "#C0C0C0", "#CD7F32"]

	return (
		<div className="flex items-center justify-center">
			<div>
				<h1 className="mb-5 text-4xl font-bold">
					Leaderboard of {lobby?.name}
				</h1>
				<ul>
					{lobby?.players?.map((player, index) => {
						const place = index + 1

						const backgroundColor = placeColors[index] || ""
						const color = place <= 3 ? "text-white" : ""

						return (
							<li
								key={player.id}
								className="mb-3 flex w-[50vw] items-center border-[1px] border-gray-500 px-4 py-2"
							>
								<span
									className={`
									mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-full text-gray-500 bg-[${backgroundColor}] ${color}
									`}
								>
									{index + 1}
								</span>
								<img src={player.img} className="mr-2 h-[50px] w-[50px]" />
								<div className="text-left">
									<p className="font-bold">{player.name}</p>
									<span>2/{numberOfQuestions}</span>
								</div>
							</li>
						)
					})}
				</ul>

				<div className="mt-4 flex justify-between">
					<Button className="px-5 py-1">exit</Button>
					<Button className="px-5 py-1">play again</Button>
				</div>
			</div>
		</div>
	)
}
