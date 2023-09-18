"use node"

import { v } from "convex/values"
import OpenAi from "openai"
import { action } from "./_generated/server"
import { Id } from "./_generated/dataModel"

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

export const getQuestions = action({
	args: { topic: v.string() },
	handler: async (_, { topic }) => {
		const apiKey = process.env.OPENAI_API_KEY

		if (!apiKey) {
			throw new Error("No openai key provided.")
		}

		const openai = new OpenAi({
			apiKey,
		})

		const prompt = `Give me 3 uncommon questions about ${topic} in json format. Each question should have id, value, answers and correctAnswerId field. In answers field there should be 4 answers, each with id and value.`

		const {
			choices: [answer],
		} = await openai.chat.completions.create({
			temperature: 0.8,
			messages: [{ role: "user", content: prompt }],
			model: "gpt-3.5-turbo",
		})

		if (!answer.message.content) {
			throw new Error("No answer from openai.")
		}

		return JSON.parse(answer.message.content) as Question[]
	},
})
