import { v } from "convex/values"
import { mutation } from "./_generated/server"
import { PlayerSchema } from "./schema"

export const createLobby = mutation({
	args: {
		name: v.string(),
		player: PlayerSchema,
	},
	handler: async (ctx, args) => {
		const id = await ctx.db.insert("lobbies", {
			name: args.name,
			players: [args.player],
			maxPlayers: 2,
		})

		return id
	},
})

export const joinLobby = mutation({
	args: {
		lobbyId: v.id("lobbies"),
		player: PlayerSchema,
	},
	handler: async (ctx, args) => {
		const lobby = await ctx.db.get(args.lobbyId)

		if (!lobby) {
			throw new Error("Lobby not found")
		}

		if (lobby.players.length >= lobby.maxPlayers) {
			throw new Error("Lobby is full")
		}

		const isPlayerAlreadyInLobby = lobby.players.some(
			(p) => p.id === args.player.id,
		)

		if (isPlayerAlreadyInLobby) {
			return
		}

		await ctx.db.patch(args.lobbyId, {
			players: [...lobby.players, args.player],
		})
	},
})

export const leaveLobby = mutation({
	args: {
		lobbyId: v.id("lobbies"),
		playerId: v.string(),
	},
	handler: async (ctx, args) => {
		const lobby = await ctx.db.get(args.lobbyId)

		if (!lobby) {
			throw new Error("Lobby not found")
		}

		const playerInLobby = lobby.players.find(
			(player) => player.id === args.playerId,
		)

		if (!playerInLobby) {
			throw new Error("Player not in the lobby")
		}

		if (lobby.players.length === 1) {
			await ctx.db.delete(args.lobbyId)
			return
		}

		const filteredPlayers = lobby.players.filter(
			(player) => player.id !== args.playerId,
		)

		await ctx.db.patch(args.lobbyId, {
			players: filteredPlayers,
		})
	},
})
