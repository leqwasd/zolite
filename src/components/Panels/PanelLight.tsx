import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export const PanelLight: FC<
	PropsWithChildren<{ className?: string; id?: string }>
> = ({ children, className, id }) => (
	<div
		id={id}
		className={twMerge(
			"rounded-lg border border-white/20 bg-gradient-to-br from-white/20 to-white/10 px-2 py-3 shadow-lg",
			className,
		)}
	>
		{children}
	</div>
);
