import { FC, useState, useRef, useEffect } from "react";
import { PlayType } from "../types";
import { isPlayerInGame, shouldGiveAction } from "../utils";
import { PanelLight } from "./Panels/PanelLight";
import { ThreeDotMenu } from "./ThreeDotMenu";
import { twMerge } from "tailwind-merge";
import { Roka } from "./Roka";
import { GameActions } from "./GameActions";
import { PreGameActions } from "./PreGameActions";
import { useGameContext } from "../GameContext/useGameContext";

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
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const { givePersonalPule } = useGameContext();
	useEffect(() => {
		if (!menuOpen) return;
		function handleClickOutside(event: MouseEvent) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setMenuOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuOpen]);
	return (
		<PanelLight
			id={`player-${playerIndex}`}
			className={twMerge(
				"relative flex min-h-[200px] flex-col gap-2 transition-[flex-grow]",
				shouldFlex ? "flex-2" : "flex-1",
			)}
		>
			<ThreeDotMenu onOpen={() => setMenuOpen(true)} />
			{menuOpen && (
				<div
					ref={menuRef}
					className="absolute top-10 right-2 z-10 min-w-[120px] rounded-lg border border-emerald-400/40 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 p-2 text-emerald-100 shadow-lg"
				>
					<button
						className="block w-full rounded px-2 py-1 text-left transition-colors hover:bg-emerald-700/60"
						onClick={() => {
							givePersonalPule(playerIndex);
							setMenuOpen(false);
						}}
					>
						Piešķirt personīgo puli
					</button>
				</div>
			)}
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
