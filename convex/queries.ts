import { query } from "./_generated/server"

export const getCategories = query({
	args: {},
	handler: (ctx) => ctx.db.query("categories").collect(),
})

export const getLobbies = query({
	args: {},
	handler: (ctx) => ctx.db.query("lobbies").order("desc").collect(),
})
