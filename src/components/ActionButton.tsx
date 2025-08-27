import { FC, PropsWithChildren } from "react";
import { PlayTypeEnum } from "../types";

const variantClasses = new Map<PlayTypeEnum, string>([
	[
		PlayTypeEnum.Galdins,
		"hover:bg-orange-400/20 bg-orange-400/10 text-white border-orange-500 hover:border-orange-400",
	],
	[
		PlayTypeEnum.MazaZole,
		"hover:bg-red-400/20 bg-red-400/10 text-white border-red-500 hover:border-red-400",
	],
	[
		PlayTypeEnum.Zole,
		"hover:bg-green-400/20 bg-green-400/10 text-white border-green-500 hover:border-green-400",
	],
	[
		PlayTypeEnum.Lielais,
		"hover:bg-blue-400/20 bg-blue-400/10 text-white border-blue-500 hover:border-blue-400",
	],
]);

// Button Components
export const ActionButton: FC<
	PropsWithChildren<{
		onClick: () => void;
		type: PlayTypeEnum;
	}>
> = ({ onClick, children, type }) => {
	return (
		<button
			type="button"
			className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold shadow-md transition-all duration-300 hover:text-white hover:shadow-lg ${variantClasses.get(type)}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
