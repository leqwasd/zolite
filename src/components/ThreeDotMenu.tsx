import { FC } from "react";

export const ThreeDotMenu: FC<{
	onOpen: () => void;
}> = ({ onOpen }) => (
	<button
		className="absolute top-2 right-2 rounded-lg p-2 hover:bg-gray-700 focus:outline-none"
		aria-label="Open menu"
		onClick={onOpen}
		type="button"
	>
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="12" cy="5" r="2" fill="white" />
			<circle cx="12" cy="12" r="2" fill="white" />
			<circle cx="12" cy="19" r="2" fill="white" />
		</svg>
	</button>
);
