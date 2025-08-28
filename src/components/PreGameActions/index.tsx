import { FC } from "react";
import { useGameContext } from "../../GameContext/useGameContext";
import { GameType } from "../../types";
import { PreGameActionsPGM } from "./PreGameActionsPGM";
import { PreGameActionsPM } from "./PreGameActionsPM";

export const PreGameActions: FC<{ player: number }> = ({ player }) => {
	const { state } = useGameContext();
	if (state.type === GameType.PGM) {
		return <PreGameActionsPGM player={player} />;
	} else {
		return <PreGameActionsPM player={player} />;
	}
};
