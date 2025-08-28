import { FC } from "react";
import { PlayType, PlayTypeEnum } from "../../types";
import { GameActionsGaldins } from "./GameActionsGaldins";
import { GameActionsMazaZole } from "./GameActionsMazaZole";
import { GameActionsLielais } from "./GameActionsLielais";
import { GameActionsZole } from "./GameActionsZole";

export const GameActions: FC<{
	game: PlayType;
	playerIndex: number;
}> = ({ game, playerIndex }) => {
	switch (game[0]) {
		case PlayTypeEnum.Galdins:
			return <GameActionsGaldins game={game} playerIndex={playerIndex} />;
		case PlayTypeEnum.MazaZole:
			return (
				<GameActionsMazaZole game={game} playerIndex={playerIndex} />
			);
		case PlayTypeEnum.Lielais:
			return <GameActionsLielais game={game} playerIndex={playerIndex} />;
		case PlayTypeEnum.Zole:
			return <GameActionsZole game={game} playerIndex={playerIndex} />;
		default:
			return null;
	}
};
