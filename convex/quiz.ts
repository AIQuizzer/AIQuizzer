"use node"

import { action } from "./_generated/server"
import { v } from "convex/values"
import OpenAi from "openai"

export const getQuestions = action({
	args: { topic: v.string() },
	handler: async (ctx, { topic }) => {
		const apiKey = process.env.OPENAI_API_KEY

		if (!apiKey) {
			throw new Error("No openai key provided.")
		}

		const openai = new OpenAi({
			apiKey: apiKey,
		})

		const prompt = `Give me 3 uncommon questions about ${topic} in json format. Each question should have id, value, answers and correctAnswerId field. In answers field there should be 4 answers, each with id and value.`

		const completion = await openai.chat.completions.create({
			temperature: 0.8,
			messages: [{ role: "user", content: prompt }],
			model: "gpt-3.5-turbo",
		})

		const answer = completion.choices[0].message.content
		return answer
	},
})
