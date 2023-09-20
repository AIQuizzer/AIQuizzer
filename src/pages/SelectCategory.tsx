import { withAuthenticationRequired } from "@auth0/auth0-react"
import { useAction, useQuery } from "convex/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../convex/_generated/api"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { Redirect } from "../components/Redirect"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar"
import { Button } from "../components/ui/Button"
import { useUser } from "../lib"

const Categories = () => {
	const player = useUser()
	const navigate = useNavigate()
	const createLobby = useAction(api.quiz.createLobby)
	const categories = useQuery(api.queries.getCategories)

	const [isCreatingLobby, setIsCreatingLobby] = useState(false)

	if (!categories) {
		return <LoadingSpinner />
	}

	return (
		<>
			{isCreatingLobby && (
				<div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
					<LoadingSpinner />
					<p className="text-white">
						Please wait - the questions are generated...
					</p>
				</div>
			)}
			<ul className="flex flex-wrap items-center justify-center gap-4">
				{categories.map((category) => (
					<li
						key={category._id}
						className="border-20 flex items-center justify-center gap-4 rounded-lg bg-neutral-200"
					>
						<Button
							className="flex cursor-pointer gap-4 px-4 py-8"
							disabled={isCreatingLobby}
							onClick={async () => {
								setIsCreatingLobby(true)

								try {
									const lobbyId = await createLobby({
										name: category.name,
										player,
									})

									navigate(`/lobby/${lobbyId}`)
								} catch (e) {
									setIsCreatingLobby(false)
								}
							}}
						>
							<Avatar key={category._id}>
								<AvatarImage src={category.img} />
								<AvatarFallback>{category.name}</AvatarFallback>
							</Avatar>
							<span>{category.name}</span>
						</Button>
					</li>
				))}
			</ul>
		</>
	)
}

const _SelectCategory = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-8">
			<h1 className="text-3xl font-semibold">Select category</h1>
			<Categories />
		</div>
	)
}

export const SelectCategory = withAuthenticationRequired(_SelectCategory, {
	onRedirecting: () => <Redirect />,
})
