import { createContext } from "react";
import {
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

export const GameContext = createContext({} as GameContext);
export type GameContext = {
	state: Required<GameState>;
	gamesWithScore: GameWithScore[];
	setGamestateAction(action: PlayTypeEnum, player: number): void;
	gameResultZaudejaGaldinu(type: PlayTypeGaldins, player: number): void;
	gameResultMazaZole(type: PlayTypeMazaZole, result: boolean): void;
	gameResultLielais(
		type: PlayTypeZole | PlayTypeLielais,
		result: ZoleWinResult | ZoleLoseResult,
	): void;
};
