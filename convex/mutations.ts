import { v } from "convex/values"
import { mutation } from "./_generated/server"
import { PlayerSchema } from "./schema"

export const createLobby = mutation({
	args: {
		name: v.string(),
		player: PlayerSchema,
	},
	handler: async (ctx, args) => {
		return ctx.db.insert("lobbies", {
			name: args.name,
			players: [args.player],
			joinedPlayers: 1,
			maxPlayers: 2,
		})
	},
})
