import { query } from "./_generated/server"
import { v } from "convex/values"

export const getCategories = query({
	args: {},
	handler: (ctx) => ctx.db.query("categories").collect(),
})

export const getLobbies = query({
	args: {},
	handler: async (ctx) => {
		const lobbies = await ctx.db.query("lobbies").order("desc").collect()

		return lobbies.filter((lobby) => lobby.players.length < lobby.maxPlayers)
	},
})

export const getLobby = query({
	args: {
		lobbyId: v.string(),
	},
	handler: async (ctx, args) => {
		const [lobby] = await ctx.db
			.query("lobbies")
			.filter((lobby) => lobby.eq(lobby.field("_id"), args.lobbyId))
			.collect()

		return lobby
	},
})
