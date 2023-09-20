import { v } from "convex/values"
import { Id } from "./_generated/dataModel"
import { query } from "./_generated/server"

export const getCategories = query({
	args: {},
	handler: (ctx) => ctx.db.query("categories").collect(),
})

export const getLobbies = query({
	args: {},
	handler: async (ctx) => {
		const lobbies = await ctx.db
			.query("lobbies")
			.filter((f) => f.eq(f.field("gameId"), ""))
			.order("desc")
			.collect()

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

export const getGame = query({
	args: { lobbyId: v.optional(v.id("lobbies")) },
	handler: async (ctx, args) => {
		if (!args.lobbyId) {
			return null
		}
		const lobby = await ctx.db.get(args.lobbyId)

		if (!lobby) {
			return null
		}

		const gameId = lobby.gameId as Id<"games">

		if (!gameId) {
			return null
		}

		const game = await ctx.db.get(gameId)

		return game
	},
})
