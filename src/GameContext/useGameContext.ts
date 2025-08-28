import { useContext } from "react";
import { GameContext } from ".";

export function useGameContext() {
	return useContext(GameContext);
}
