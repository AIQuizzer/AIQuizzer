import { query } from "./_generated/server"

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
