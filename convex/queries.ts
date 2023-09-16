import { query } from "./_generated/server"

export const getCategories = query({
	args: {},
	handler: (ctx) => ctx.db.query("categories").collect(),
})

export const getLobbies = query({
	args: {},
	handler: (ctx) =>
		ctx.db
			.query("lobbies")
			.filter((q) => q.neq(q.field("joinedPlayers"), q.field("maxPlayers")))
			.order("desc")
			.collect(),
})
