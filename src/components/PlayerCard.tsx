import { FC } from "react";
import { PlayType } from "../types";
import { isPlayerInGame, shouldGiveAction } from "../utils";
import { PanelLight } from "./Panels/PanelLight";
import { twMerge } from "tailwind-merge";
import { Roka } from "./Roka";
import { GameActions } from "./GameActions";
import { PreGameActions } from "./PreGameActions";

export const PlayerCard: FC<{
	player: string;
	playerIndex: number;
	currentDealer: number;
	playerCount: number;
	preGameActions: number;
	game: PlayType | null;
}> = ({
	player,
	playerIndex,
	currentDealer,
	playerCount,
	preGameActions,
	game,
}) => {
	const shouldGivePreGameAction =
		game == null &&
		shouldGiveAction(
			currentDealer,
			preGameActions,
			playerCount,
			playerIndex,
		);
	const shouldGiveGameAction =
		game != null && isPlayerInGame(currentDealer, playerCount, playerIndex);

	const shouldFlex = shouldGivePreGameAction || shouldGiveGameAction;
	return (
		<PanelLight
			id={`player-${playerIndex}`}
			className={twMerge(
				"flex min-h-[200px] flex-col gap-2 transition-[flex-grow]",
				shouldFlex ? "flex-2" : "flex-1",
			)}
		>
			<div className="text-center text-lg font-semibold text-white">
				{player}
			</div>
			<Roka
				currentDealer={currentDealer}
				playerCount={playerCount}
				playerIndex={playerIndex}
			/>

			{shouldGivePreGameAction && <PreGameActions player={playerIndex} />}

			{shouldGiveGameAction && (
				<GameActions game={game} playerIndex={playerIndex} />
			)}
		</PanelLight>
	);
};
