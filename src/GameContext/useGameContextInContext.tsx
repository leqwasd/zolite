import { useCallback, useMemo } from "react";
import { Route } from "../routes/game.$data";
import {
	Game,
	GameState,
	GameType,
	GameWithScore,
	PlayTypeEnum,
	PlayTypeGaldins,
	PlayTypeLielais,
	PlayTypeMazaZole,
	PlayTypeZole,
	LoseResult,
	WinResult,
} from "../types";
import { getPointsForGameForPlayer } from "../points";
import { findPlayerWithAction, findPlayerWithFirstRoka } from "../utils";

function nextDealer(state: Required<GameState>): number {
	return (state.dealer + state.games.length + 1) % state.players.length;
}

function useNavigateGame() {
	const navigate = Route.useNavigate();
	return useCallback(
		(data: GameState, hash?: string) =>
			void navigate({
				to: "/game/$data",
				params: {
					data,
				},
				hash,
				hashScrollIntoView: {
					behavior: "smooth",
					block: "center",
					inline: "center",
				},
			}),
		[navigate],
	);
}
function withScore(
	game: Game,
	previousScores: number[],
	players: string[],
): GameWithScore {
	const diff = players.map((_, i) => {
		return getPointsForGameForPlayer(game, i, players.length);
	});
	if (game[0] === PlayTypeEnum.Lielais) {
		// Special case for Lielais
		const player = game[1];
		const result = game[2];
		const pule = game[3];
		if (result > 0 && pule !== -1) {
			if (pule === player) {
				// Izņēma savu puli, nekas nemainās
			} else if (pule === players.length) {
				// Izņēma kopējo puli
				for (let i = 0; i < diff.length; i++) {
					diff[i] -= 1;
				}
				diff[player] += players.length;
			} else {
				// Izņēma kāda cita puli
				diff[pule] -= players.length;
				diff[player] += players.length;
			}
		}
	}
	const scores = previousScores.map((score, i) => score + diff[i]);
	return {
		game,
		diff,
		scores,
	};
}
export function useGameContextInContext() {
	const { data } = Route.useParams();
	const state = useMemo(
		() => ({
			...data,
			games: data.games ?? [],
			preGameActions: data.preGameActions ?? 0,
			gameType: data.gameType ?? null,
		}),
		[data],
	);
	const gamesWithScore = useMemo(() => {
		const results: GameWithScore[] = [];
		let previousScores: number[] = null!;
		for (const game of state.games) {
			const gameWithScore = withScore(
				game,
				previousScores ?? new Array(state.players.length).fill(0),
				state.players,
			);
			results.push(gameWithScore);
			previousScores = gameWithScore.scores;
		}
		return results;
	}, [state]);
	const navigate = useNavigateGame();
	const setGamestateAction = useCallback(
		(action: PlayTypeEnum, player: number) => {
			if (
				action === PlayTypeEnum.Galdins ||
				action === PlayTypeEnum.Pule
			) {
				if (state.preGameActions === 2) {
					if (state.type === GameType.PGM) {
						return navigate(
							{
								...state,
								preGameActions: 0,
								gameType: [PlayTypeEnum.Galdins],
							},
							"players",
						);
					} else if (state.type === GameType.PM) {
						const game: Game = [
							PlayTypeEnum.Pule,
							new Date().toISOString(),
						];
						const pules = [...state.pules];
						const totalPules = pules.reduce((a, b) => a + b, 0);
						if (state.players.length > 3 && totalPules === 0) {
							pules[state.players.length] = 2;
						} else {
							pules[state.players.length] =
								pules[state.players.length] + 1;
						}
						return navigate(
							{
								...state,
								games: [...state.games, game],
								gameType: null,
								preGameActions: 0,
								pules,
							},
							`player-${findPlayerWithFirstRoka(nextDealer(state), state.players.length)}`,
						);
					} else {
						// ???
						return;
					}
				} else {
					const currentDealer =
						(state.dealer + state.games.length) %
						state.players.length;
					return navigate(
						{
							...state,
							preGameActions: state.preGameActions + 1,
						},
						`player-${findPlayerWithAction(currentDealer, state.preGameActions + 1, state.players.length)}`,
					);
				}
			}
			return navigate(
				{
					...state,
					gameType: [action, player],
				},
				`player-${player}`,
			);
		},
		[navigate, state],
	);
	const gameResultZaudejaGaldinu = useCallback(
		(type: PlayTypeGaldins, player: number) => {
			const game: Game = [...type, player, new Date().toISOString()];
			return navigate(
				{
					...state,
					games: [...state.games, game],
					gameType: null,
					preGameActions: 0,
				},
				`player-${findPlayerWithFirstRoka(nextDealer(state), state.players.length)}`,
			);
		},
		[navigate, state],
	);
	const gameResultMazaZole = useCallback(
		(type: PlayTypeMazaZole, result: boolean) => {
			const game: Game = [...type, +result, new Date().toISOString()];
			return navigate(
				{
					...state,
					games: [...state.games, game],
					gameType: null,
					preGameActions: 0,
				},
				`player-${findPlayerWithFirstRoka(nextDealer(state), state.players.length)}`,
			);
		},
		[navigate, state],
	);
	const gameResultLielais = useCallback(
		(type: PlayTypeLielais, result: WinResult | LoseResult) => {
			let pules = state.pules;
			let receivedPule = -1;
			if (type[0] === PlayTypeEnum.Lielais) {
				const totalPules = pules.reduce((a, b) => a + b, 0);
				const player = type[1];
				if (result < 0) {
					if (state.type === GameType.PM && totalPules > 0) {
						// Ja zaudēja kā lielais, tad iedod personīgo puli
						pules = [...state.pules];
						pules[player] = pules[player] + 1;
					}
				} else {
					if (totalPules > 0) {
						if (pules[player] > 0) {
							// Ir personīgā pule
							// Izņem to
							receivedPule = player;
							pules = [...state.pules];
							pules[receivedPule] = pules[receivedPule] - 1;
						} else if (pules[state.players.length] > 0) {
							// Ir kopējā pule
							// Izņem to
							receivedPule = state.players.length;
							pules = [...state.pules];
							pules[receivedPule] = pules[receivedPule] - 1;
						} else {
							// Samklē kādu citu personīgo puli
							// Look to the right first, then loop around to players with lower indices
							for (let i = 1; i < state.players.length; i++) {
								const playerIndex =
									(player + i) % state.players.length;
								if (pules[playerIndex] > 0) {
									receivedPule = playerIndex;
									pules = [...state.pules];
									pules[receivedPule] =
										pules[receivedPule] - 1;
									break;
								}
							}
						}
					}
				}
			}
			const game: Game = [
				...type,
				result,
				receivedPule,
				new Date().toISOString(),
			];

			return navigate(
				{
					...state,
					games: [...state.games, game],
					gameType: null,
					preGameActions: 0,
					pules,
				},
				`player-${findPlayerWithFirstRoka(nextDealer(state), state.players.length)}`,
			);
		},
		[navigate, state],
	);
	const gameResultZole = useCallback(
		(type: PlayTypeZole, result: WinResult | LoseResult) => {
			const game: Game = [...type, result, new Date().toISOString()];
			return navigate(
				{
					...state,
					games: [...state.games, game],
					gameType: null,
					preGameActions: 0,
				},
				`player-${findPlayerWithFirstRoka(nextDealer(state), state.players.length)}`,
			);
		},
		[navigate, state],
	);
	const givePersonalPule = useCallback(
		(player: number) => {
			const pules = [...state.pules];
			pules[player] = pules[player] + 1;
			return navigate({
				...state,
				pules,
			});
		},
		[navigate, state],
	);
	return {
		state,
		gamesWithScore,
		setGamestateAction,
		gameResultZaudejaGaldinu,
		gameResultMazaZole,
		gameResultLielais,
		gameResultZole,
		givePersonalPule,
	};
}
