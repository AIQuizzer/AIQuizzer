import { Button } from "../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"

const DUMMY_USERS = [
	{
		id: "1",
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
		name: "User 1",
	},
	{
		id: "2",
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
		name: "User 2",
	},
	{
		id: "3",
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
		name: "User 3",
	},
	{
		id: "4",
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
		name: "User 4",
	},
	{
		id: "5",
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
		name: "User 5",
	},
	{
		id: "6",
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
		name: "User 6",
	},
	{
		id: "7",
		image:
			"https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png",
		name: "User 7",
	},
]

export function Lobby({ onStart }: { onStart: () => void }) {
	return (
		<div className="align-center relative flex min-h-[calc(100%-70px)] justify-center p-7">
			<div className="text-center">
				<h1 className="mb-2 text-5xl font-bold">Geography</h1>
				<h3 className="mb-10 text-2xl">7/10 players</h3>

				<ul className="mb-10 grid grid-cols-2 gap-8 xs:grid-cols-3 sm:grid-cols-4">
					{DUMMY_USERS.map((user) => (
						<li
							key={user.id}
							className="flex flex-col items-center justify-center"
						>
							<Avatar className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px]">
								<AvatarImage src={user.image} />
								<AvatarFallback>User avatar</AvatarFallback>
							</Avatar>
							<p>{user.name}</p>
						</li>
					))}
				</ul>
				<Button onClick={onStart} className="px-12 py-6 text-xl font-bold">
					Start
				</Button>
			</div>
			<Button className="fixed bottom-[5%] right-[5%] px-5 py-1">Leave</Button>
		</div>
	)
}
