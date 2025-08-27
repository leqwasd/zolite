import { FC } from "react";
import { PlayTypeEnum, PlayTypeMazaZole } from "../../types";
import { useGameContext } from "../../GameContext/useGameContext";
import { PlayTypeDisplay } from "../PlayTypeDisplay";
import { ActionButton } from "../ActionButton";

export const GameActionsMazaZole: FC<{
	game: PlayTypeMazaZole;
	playerIndex: number;
}> = ({ game, playerIndex }) => {
	const { gameResultMazaZole } = useGameContext();
	if (game[1] !== playerIndex) {
		// Player is not the one who played Maza Zole, no result to show
		return null;
	}
	return (
		<>
			<PlayTypeDisplay type={game[0]} />
			<div className="flex flex-col gap-2">
				<ActionButton
					type={PlayTypeEnum.Zole}
					onClick={() => gameResultMazaZole(game, true)}
				>
					Uzvarēja
				</ActionButton>
				<ActionButton
					type={PlayTypeEnum.MazaZole}
					onClick={() => gameResultMazaZole(game, false)}
				>
					Zaudēja
				</ActionButton>
			</div>
		</>
	);
};
