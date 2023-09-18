import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { useMutation, useQuery } from "convex/react"
import { useNavigate } from "react-router-dom"
import { api } from "../../convex/_generated/api"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { Redirect } from "../components/Redirect"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

const Categories = () => {
	const { user } = useAuth0()
	const navigate = useNavigate()
	const createLobby = useMutation(api.mutations.createLobby)
	const categories = useQuery(api.queries.getCategories)

	if (!categories) {
		return <LoadingSpinner />
	}

	return (
		<ul className="flex flex-wrap items-center justify-center gap-4">
			{categories.map((category) => (
				<li
					key={category._id}
					className="border-20 flex items-center justify-center gap-4 rounded-lg bg-neutral-200"
				>
					<Button
						className="flex cursor-pointer gap-4 px-4 py-8"
						onClick={async () => {
							if (!user?.name || !user.sub || !user.picture) return

							const player = {
								name: user.name,
								id: user.sub,
								img: user.picture,
							}

							const lobbyId = await createLobby({
								name: category.name,
								player,
							})

							navigate(`/lobby/${lobbyId}`)
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
