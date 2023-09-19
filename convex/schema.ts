import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const PlayerSchema = v.object({
	id: v.string(),
	name: v.string(),
	img: v.string(),
})

const GamePlayerSchema = v.object({
	id: v.string(),
	name: v.string(),
	img: v.string(),
	score: v.number(),
})

const AnswerSchema = v.object({
	id: v.string(),
	value: v.string(),
})

const QuestionSchema = v.object({
	id: v.string(),
	value: v.string(),
	answers: v.array(AnswerSchema),
	correctAnswerId: v.string(),
})

// eslint-disable-next-line import/no-default-export
export default defineSchema({
	lobbies: defineTable({
		name: v.string(),
		players: v.array(PlayerSchema),
		maxPlayers: v.number(),
		gameId: v.union(v.id("games"), v.literal("")),
	}),
	categories: defineTable({
		name: v.string(),
		img: v.string(),
	}),
	games: defineTable({
		questions: v.array(QuestionSchema),
		activeQuestion: v.union(v.null(), QuestionSchema),
		players: v.array(GamePlayerSchema),
	}),
})
