import { FC } from "react";
import { PlayTypeEnum } from "../types";

function getPlayTypeName(type: PlayTypeEnum) {
	switch (type) {
		case PlayTypeEnum.Galdins:
			return "Galdiņš";
		case PlayTypeEnum.MazaZole:
			return "Mazā zole";
		case PlayTypeEnum.Zole:
			return "Zole";
		case PlayTypeEnum.Lielais:
			return "Lielais";
		default:
			return "";
	}
}
function getColorClass(type: PlayTypeEnum) {
	switch (type) {
		case PlayTypeEnum.Galdins:
			return "text-orange-300 font-semibold";
		case PlayTypeEnum.MazaZole:
			return "text-red-300 font-semibold";
		case PlayTypeEnum.Zole:
			return "text-green-300 font-semibold";
		case PlayTypeEnum.Lielais:
			return "text-blue-300 font-semibold";
		default:
			return "text-white font-semibold";
	}
}
export const PlayTypeDisplay: FC<{
	type: PlayTypeEnum;
}> = ({ type }) => {
	return (
		<div className={"text-center font-medium"}>
			<span className={getColorClass(type)}>{getPlayTypeName(type)}</span>
		</div>
	);
};
