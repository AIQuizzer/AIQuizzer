const DUMMY_USERS = [
	{
		id: "qwe",
		name: "Mark",
		score: 0,
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
	},
	{
		id: "qwer",
		name: "Robert",
		score: 2,
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
	},
	{
		id: "qwet",
		name: "Joe",
		score: 0,
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
	},
	{
		id: "qwey",
		name: "Steve",
		score: 1,
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
	},
	{
		id: "qweyf",
		name: "Patrick",
		score: 2,
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
	},
	{
		id: "qweyg",
		name: "Josh",
		score: 2,
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
	},
]

interface User {
	id: string
	name: string
	score: number
	image: string
}

export default function Leaderboard({
	numberOfQuestions,
}: {
	numberOfQuestions: number
}) {
	const sortedUsers = DUMMY_USERS.sort((a, b) => b.score - a.score)

	return (
		<div className="flex items-center justify-center">
			<div>
				<h1 className="mb-5 text-4xl font-bold">Leaderboard</h1>
				<ul>
					{sortedUsers.map((user: User, index: number) => {
						const place = index + 1
						const backgroundColor =
							place === 1
								? "gold"
								: place === 2
								? "#C0C0C0"
								: place === 3
								? "#CD7F32"
								: ""

						const color = place <= 3 ? "white" : ""

						return (
							<li
								key={user.id}
								className="mb-3 flex w-[50vw] items-center border-[1px] border-gray-500 px-4 py-2"
							>
								<span
									className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200 text-gray-500"
									style={{ backgroundColor, color }}
								>
									{index + 1}
								</span>
								<img src={user.image} className=" mr-2 h-[50px] w-[50px]" />
								<div className="text-left">
									<p className="font-bold">{user.name}</p>
									<span>
										{user.score}/{numberOfQuestions}
									</span>
								</div>
							</li>
						)
					})}
				</ul>

				<div className="mt-4 flex justify-between">
					<button className="rounded-sm border-[1px] border-gray-800 px-4 py-1">
						exit
					</button>
					<button className="rounded-sm border-[1px] border-gray-800 px-4 py-1">
						play again
					</button>
				</div>
			</div>
		</div>
	)
}
