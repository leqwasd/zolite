import { FC } from "react";
import { PlayTypeEnum, PlayTypeZole, LoseResult, WinResult } from "../../types";
import { useGameContext } from "../../GameContext/useGameContext";
import { PlayTypeDisplay } from "../PlayTypeDisplay";
import { ActionButton } from "../ActionButton";

export const GameActionsZole: FC<{
	game: PlayTypeZole;
	playerIndex: number;
}> = ({ game, playerIndex }) => {
	const { gameResultZole } = useGameContext();
	if (game[1] !== playerIndex) {
		// Player is not the one who played Zole or Lielais, no result to show
		return null;
	}
	return (
		<>
			<PlayTypeDisplay type={game[0]} />
			<div className="flex gap-2">
				<div className="flex flex-1 flex-col gap-2">
					<ActionButton
						type={PlayTypeEnum.Zole}
						onClick={() => gameResultZole(game, WinResult.win61)}
					>
						61 - 90 acis
					</ActionButton>
					<ActionButton
						type={PlayTypeEnum.Zole}
						onClick={() => gameResultZole(game, WinResult.win91)}
					>
						91+ acis
					</ActionButton>
					<ActionButton
						type={PlayTypeEnum.Zole}
						onClick={() => gameResultZole(game, WinResult.winAll)}
					>
						Visi stiķi
					</ActionButton>
				</div>
				<div className="flex flex-1 flex-col gap-2">
					<ActionButton
						type={PlayTypeEnum.MazaZole}
						onClick={() => gameResultZole(game, LoseResult.lost30)}
					>
						≤30 acis
					</ActionButton>
					<ActionButton
						type={PlayTypeEnum.MazaZole}
						onClick={() => gameResultZole(game, LoseResult.lost60)}
					>
						31 - 60 acis
					</ActionButton>
					<ActionButton
						type={PlayTypeEnum.MazaZole}
						onClick={() => gameResultZole(game, LoseResult.lostAll)}
					>
						0 stiķi
					</ActionButton>
				</div>
			</div>
		</>
	);
};
