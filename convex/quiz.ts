"use node"

import { v } from "convex/values"
import { internal } from "./_generated/api"
import { Id } from "./_generated/dataModel"
import { action } from "./_generated/server"

export interface Player {
	id: string
	name: string
	img: string
}

export interface Lobby {
	_id: Id<"lobbies">
	name: string
	players: Player[]
	maxPlayers: number
	_creationTime: number
	gameId: string
}
export interface Answer {
	id: string
	value: string
}
export interface Question {
	id: string
	value: string
	answers: Answer[]
	correctAnswerId: string
}

export const createLobby = action({
	args: {
		name: v.string(),
		player: v.object({
			id: v.string(),
			name: v.string(),
			img: v.string(),
		}),
	},
	handler: async (ctx, args) => {
		const questions = await ctx.runAction(
			internal.internalActions.getQuestions,
			{
				topic: args.name,
			},
		)

		const _id = await ctx.runMutation(internal.internalMutations.insertLobby, {
			...args,
			questions,
		})

		const id = _id as Id<"lobbies">

		return id
	},
})
