import { Button } from "../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Lobby as LobbyType } from "../../convex/quiz"

interface LobbyProps {
	lobby: LobbyType | undefined
	onStart: () => void
}

export function Lobby({ lobby, onStart }: LobbyProps) {
	return (
		<div className="align-center relative flex min-h-[calc(100%-70px)] justify-center p-7">
			<div className="text-center">
				<h1 className="mb-2 text-5xl font-bold">{lobby?.name}</h1>
				<h3 className="mb-10 text-2xl">
					{lobby?.players?.length}/{lobby?.maxPlayers} players
				</h3>

				<ul className="mb-10 flex max-w-lg flex-wrap justify-center gap-8">
					{lobby?.players?.map((player) => (
						<li
							key={player.id}
							className="flex flex-col items-center justify-center"
						>
							<Avatar className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px]">
								<AvatarImage src={player.img} />
								<AvatarFallback>User avatar</AvatarFallback>
							</Avatar>
							<p>{player.name}</p>
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
