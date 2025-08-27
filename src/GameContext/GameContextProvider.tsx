import { FC, PropsWithChildren, useCallback, useMemo } from "react";
import { GameContext } from ".";
import { Route } from "../routes/game.$data";
import {
	Game,
	GameState,
	GameWithScore,
	PlayTypeEnum,
	PlayTypeGaldins,
	PlayTypeLielais,
	PlayTypeMazaZole,
	PlayTypeZole,
	ZoleLoseResult,
	ZoleWinResult,
} from "../types";
import { findPlayerWithAction, findPlayerWithFirstRoka } from "../utils";
import { getPointsForGameForPlayer } from "../points";

function useNavigateGame() {
	const navigate = Route.useNavigate();
	return useCallback(
		(data: GameState, hash?: string) =>
			void navigate({
				to: "/game/$data",
				params: {
					data,
				},
				hash: hash ?? `player-${3}`,
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
	const diff = players.map((_, i) =>
		getPointsForGameForPlayer(game, i, players.length),
	);
	const scores = previousScores.map((score, i) => score + diff[i]);
	return {
		game,
		diff,
		scores,
	};
}
export const GameContextProvider: FC<PropsWithChildren> = ({ children }) => {
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
			if (action === PlayTypeEnum.Galdins) {
				if (state.preGameActions === 2) {
					return navigate(
						{
							...state,
							preGameActions: 0,
							gameType: [PlayTypeEnum.Galdins],
						},
						"players",
					);
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
			const nextDealer =
				(state.dealer + state.games.length + 1) % state.players.length;
			return navigate(
				{
					...state,
					games: [...state.games, game],
					gameType: null,
					preGameActions: 0,
				},
				`player-${findPlayerWithFirstRoka(nextDealer, state.players.length)}`,
			);
		},
		[navigate, state],
	);
	const gameResultMazaZole = useCallback(
		(type: PlayTypeMazaZole, result: boolean) => {
			const game: Game = [...type, +result, new Date().toISOString()];
			const nextDealer =
				(state.dealer + state.games.length + 1) % state.players.length;
			return navigate(
				{
					...state,
					games: [...state.games, game],
					gameType: null,
					preGameActions: 0,
				},
				`player-${findPlayerWithFirstRoka(nextDealer, state.players.length)}`,
			);
		},
		[navigate, state],
	);
	const gameResultLielais = useCallback(
		(
			type: PlayTypeZole | PlayTypeLielais,
			result: ZoleWinResult | ZoleLoseResult,
		) => {
			const game: Game = [...type, result, new Date().toISOString()];
			const nextDealer =
				(state.dealer + state.games.length + 1) % state.players.length;
			return navigate(
				{
					...state,
					games: [...state.games, game],
					gameType: null,
					preGameActions: 0,
				},
				`player-${findPlayerWithFirstRoka(nextDealer, state.players.length)}`,
			);
		},
		[navigate, state],
	);
	return (
		<GameContext.Provider
			value={{
				state,
				gamesWithScore,
				setGamestateAction,
				gameResultZaudejaGaldinu,
				gameResultMazaZole,
				gameResultLielais,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};
