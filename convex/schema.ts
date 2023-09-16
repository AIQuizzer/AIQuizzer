import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const PlayerSchema = v.object({
	id: v.string(),
	name: v.string(),
	img: v.string(),
})

// eslint-disable-next-line import/no-default-export
export default defineSchema({
	lobbies: defineTable({
		name: v.string(),
		players: v.array(PlayerSchema),
		maxPlayers: v.number(),
	}),
	categories: defineTable({
		name: v.string(),
		img: v.string(),
	}),
})
