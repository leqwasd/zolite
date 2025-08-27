import { FC } from "react";
import { useGameContext } from "../../GameContext/useGameContext";
import { PlayTypeDisplay } from "../PlayTypeDisplay";
import { ActionButton } from "../ActionButton";
import { PlayTypeEnum, PlayTypeGaldins } from "../../types";

export const GameActionsGaldins: FC<{
	game: PlayTypeGaldins;
	playerIndex: number;
}> = ({ game, playerIndex }) => {
	const { gameResultZaudejaGaldinu } = useGameContext();
	return (
		<>
			<PlayTypeDisplay type={game[0]} />
			<ActionButton
				type={PlayTypeEnum.MazaZole}
				onClick={() => gameResultZaudejaGaldinu(game, playerIndex)}
			>
				Zaudēja
			</ActionButton>
		</>
	);
};
