import { useAuth0 } from "@auth0/auth0-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const useUser = () => {
	const { user } = useAuth0()

	if (!user) {
		throw new Error("User is not logged in.")
	}

	if (!user.picture || !user.name || !user.sub) {
		throw new Error("User is missing required information.")
	}

	return {
		img: user.picture,
		name: user.name,
		id: user.sub,
	}
}
