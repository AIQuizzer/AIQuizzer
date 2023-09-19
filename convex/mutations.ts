import { v } from "convex/values"
import { mutation } from "./_generated/server"
import { PlayerSchema } from "./schema"
import { Id } from "./_generated/dataModel"

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
			gameId: "",
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

		const gameId = lobby.gameId as Id<"games">

		const playerInLobby = lobby.players.find(
			(player) => player.id === args.playerId,
		)

		if (!playerInLobby) {
			throw new Error("Player not in the lobby")
		}

		if (lobby.players.length === 1) {
			await ctx.db.delete(args.lobbyId)
			if (gameId) {
				await ctx.db.delete(gameId as Id<"games">)
			}
			return
		}

		const filteredPlayers = lobby.players.filter(
			(player) => player.id !== args.playerId,
		)

		if (gameId) {
			const game = await ctx.db.get(gameId as Id<"games">)
			const filteredGamePlayers = game?.players?.filter(
				(player) => player.id !== args.playerId,
			)

			await ctx.db.patch(gameId, { players: filteredGamePlayers })
		}

		await ctx.db.patch(args.lobbyId, {
			players: filteredPlayers,
		})
	},
})

export const createGame = mutation({
	args: {
		lobbyId: v.id("lobbies"),
	},
	handler: async (ctx, args) => {
		if (!args.lobbyId) {
			throw new Error("Lobby id has not been provided")
		}

		const lobby = await ctx.db.get(args.lobbyId)

		const gameId = await ctx.db.insert("games", {
			questions: [],
			activeQuestion: null,
			players: lobby!.players.map((player) => ({ ...player, score: 0 })),
		})

		await ctx.db.patch(args.lobbyId, { gameId })
	},
})

export const addPoint = mutation({
	args: {
		gameId: v.id("games"),
		playerId: v.string(),
	},
	handler: async (ctx, args) => {
		const room = await ctx.db.get(args.gameId)

		if (!room) {
			throw new Error("No room found")
		}

		const modifiedPlayers = room.players
		const player = modifiedPlayers.find((player) => player.id === args.playerId)

		if (!player) {
			throw new Error("Player not found")
		}

		player.score = player.score + 1
		await ctx.db.patch(args.gameId, { players: modifiedPlayers })
	},
})

export const restartGame = mutation({
	args: { lobbyId: v.id("lobbies") },
	handler: async (ctx, args) => {
		const lobby = await ctx.db.get(args.lobbyId)

		if (!lobby) {
			throw new Error("No lobby found")
		}

		await ctx.db.patch(args.lobbyId, { gameId: "" })
		await ctx.db.delete(lobby.gameId as Id<"games">)
	},
})
