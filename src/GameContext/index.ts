import { createContext } from "react";
import { useGameContextInContext } from "./useGameContextInContext";

export const GameContext = createContext(
	{} as ReturnType<typeof useGameContextInContext>,
);
