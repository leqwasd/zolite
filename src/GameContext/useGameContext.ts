import { useContext } from "react";
import { GameContext } from ".";

export function useGameContext(): GameContext {
	return useContext(GameContext);
}
