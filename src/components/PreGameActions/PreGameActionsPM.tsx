import { FC } from "react";
import { useGameContext } from "../../GameContext/useGameContext";
import { ActionButton } from "../ActionButton";
import { PlayTypeEnum } from "../../types";

export const PreGameActionsPM: FC<{ player: number }> = ({ player }) => {
	const { setGamestateAction, state } = useGameContext();
	return (
		<div className="flex flex-col gap-2" data-component="Actions">
			<ActionButton
				type={PlayTypeEnum.Galdins}
				onClick={() => setGamestateAction(PlayTypeEnum.Galdins, player)}
			>
				{state.preGameActions === 2 ? "Pule" : "Garām"}
			</ActionButton>
			<ActionButton
				type={PlayTypeEnum.Lielais}
				onClick={() => setGamestateAction(PlayTypeEnum.Lielais, player)}
			>
				Lielais
			</ActionButton>
			<ActionButton
				type={PlayTypeEnum.Zole}
				onClick={() => setGamestateAction(PlayTypeEnum.Zole, player)}
			>
				Zole
			</ActionButton>
			<ActionButton
				type={PlayTypeEnum.MazaZole}
				onClick={() =>
					setGamestateAction(PlayTypeEnum.MazaZole, player)
				}
			>
				Mazā zole
			</ActionButton>
		</div>
	);
};
