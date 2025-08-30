import { useMatchRoute } from "@tanstack/react-router";
import { FC, useCallback } from "react";

export const ShareButton: FC = () => {
	const isInGame = useMatchRoute()({ to: "/game/$data" });
	// Share button handler
	const handleShare = useCallback(async () => {
		let url: string;
		if (isInGame) {
			url = window.location.href;
		} else {
			url = window.location.origin + window.location.pathname;
		}
		if (navigator.share) {
			try {
				await navigator.share({
					title: "Zolītes spēle",
					url,
				});
			} catch {
				// User cancelled or error
			}
		} else {
			try {
				await navigator.clipboard.writeText(url);
				alert("Saite nokopēta!");
			} catch {
				// Neizdevās nokopēt saiti.
			}
		}
	}, [isInGame]);
	return (
		<button
			onClick={handleShare}
			title="Dalīties ar spēles saiti"
			className="flex w-full cursor-pointer items-center gap-3 px-6 py-3 text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10"
		>
			<svg
				className="h-5 w-5"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<circle cx="18" cy="5" r="3" />
				<circle cx="6" cy="12" r="3" />
				<circle cx="18" cy="19" r="3" />
				<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
				<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
			</svg>
			{isInGame ? "Dalīties ar spēli" : "Dalīties"}
		</button>
	);
};
