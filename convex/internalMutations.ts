import { v } from "convex/values"
import { internalMutation } from "./_generated/server"

export const insertLobby = internalMutation({
	args: {
		name: v.string(),
		player: v.object({
			id: v.string(),
			name: v.string(),
			img: v.string(),
		}),
		questions: v.array(
			v.object({
				id: v.string(),
				value: v.string(),
				answers: v.array(
					v.object({
						id: v.string(),
						value: v.string(),
					}),
				),
				correctAnswerId: v.string(),
			}),
		),
	},
	handler: async (ctx, args) => {
		const id = await ctx.db.insert("lobbies", {
			name: args.name,
			players: [args.player],
			maxPlayers: 2,
			gameId: "",
			questions: args.questions,
		})

		return id
	},
})
