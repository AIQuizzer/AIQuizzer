import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

export const SelectCategory = () => {
	const categories = useQuery(api.queries.getCategories)

	return (
		<div className="flex flex-col items-center justify-center gap-8">
			<h1 className="text-3xl font-semibold">Select category</h1>
			<ul className="flex flex-wrap items-center justify-center gap-4">
				{categories ? (
					categories.map((category) => (
						<li
							key={category._id}
							className="border-20 flex items-center justify-center gap-4 rounded-lg bg-neutral-200"
						>
							<Button className="flex cursor-pointer gap-4 px-4 py-8">
								<Avatar key={category._id}>
									<AvatarImage src={category.img} />
									<AvatarFallback>{category.name}</AvatarFallback>
								</Avatar>
								<span>{category.name}</span>
							</Button>
						</li>
					))
				) : (
					<LoadingSpinner />
				)}
			</ul>
		</div>
	)
}
