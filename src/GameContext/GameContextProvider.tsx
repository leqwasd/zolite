import { FC, PropsWithChildren } from "react";
import { GameContext } from ".";

import { useGameContextInContext } from "./useGameContextInContext";

export const GameContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const state = useGameContextInContext();
	return (
		<GameContext.Provider value={state}>{children}</GameContext.Provider>
	);
};
