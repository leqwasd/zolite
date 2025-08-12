import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
export const FlexLayout: FC<
	PropsWithChildren<{ className?: string; id?: string }>
> = ({ children, className, id }) => (
	<div
		id={id}
		className={twMerge("flex flex-col gap-2 landscape:flex-row", className)}
	>
		{children}
	</div>
);
