import { FC } from "react";
import { getRoka } from "../utils";

function useRoka(
	currentDealer: number,
	playerCount: number,
	playerIndex: number,
) {
	const roka = getRoka(currentDealer, playerCount, playerIndex);
	if (roka == null) {
		return null;
	}
	return `${roka + 1}. roka`;
}

export const Roka: FC<{
	currentDealer: number;
	playerCount: number;
	playerIndex: number;
}> = ({ currentDealer, playerCount, playerIndex }) => {
	const dealer = currentDealer === playerIndex ? "(Dalītājs)" : null;
	const text = useRoka(currentDealer, playerCount, playerIndex);
	return (
		<div
			className="text-center text-sm text-emerald-200"
			data-component="Roka"
		>
			{dealer} {text}
		</div>
	);
};
