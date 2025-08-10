import { createFileRoute, Link } from "@tanstack/react-router";
import { FC, ReactNode } from "react";
import { useHistoryGames } from "../effects/useHistoryGames";

const HomePrimaryButton: FC<{
	children: ReactNode;
	to: string;
	params?: Record<string, unknown>;
	variant?: "primary" | "secondary";
}> = ({ children, to, params, variant = "primary" }) => {
	const baseClasses =
		"inline-block py-4 px-8 rounded-lg font-semibold text-xl transition-all duration-300 shadow-lg hover:shadow-xl";
	const variantClasses =
		variant === "primary"
			? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
			: "bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white border border-white/30";

	return (
		<Link
			to={to}
			params={params}
			className={`${baseClasses} ${variantClasses}`}
		>
			{children}
		</Link>
	);
};

const RecentGamesSection: FC = () => {
	const recentGames = useHistoryGames();
	if (recentGames.length === 0) {
		return null;
	}

	const clearAllGames = () => {
		if (confirm("Vai tiešām vēlaties dzēst visas saglabātās spēles?")) {
			const keysToRemove = [];
			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);
				if (key?.startsWith("game-")) {
					keysToRemove.push(key);
				}
			}
			keysToRemove.forEach((key) => localStorage.removeItem(key));
			window.location.reload();
		}
	};

	return (
		<div className="mx-auto mt-8 max-w-lg rounded-lg border border-white/20 bg-gradient-to-br from-white/20 to-white/10 p-6 shadow-lg">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-lg font-semibold text-white">
					Pēdējās spēles
				</h3>
				<button
					onClick={clearAllGames}
					className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
				>
					Dzēst visas
				</button>
			</div>
			<div className="space-y-3">
				{recentGames.map((game) => (
					<div
						key={game.meta.id}
						className="flex items-center justify-between rounded-lg bg-white/10 p-3"
					>
						<div>
							<div className="font-medium text-white">
								{game.players.join(", ")}
							</div>
							<div className="text-sm text-emerald-200">
								{new Date(game.meta.date).toLocaleDateString(
									"lv-LV",
								)}
								• {game.games?.length ?? 0} spēles
							</div>
						</div>
						<Link
							to="/game/$data"
							params={{ data: game }}
							className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white transition-colors hover:bg-emerald-700"
						>
							Turpināt
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

const Index: FC = () => {
	return (
		<div className="relative flex flex-col items-center justify-center overflow-hidden">
			<h1 className="mb-8 text-4xl font-bold text-white drop-shadow-lg">
				Zolītes punktu tabula
			</h1>

			<div className="mb-8 space-y-4">
				<HomePrimaryButton
					to="/new/{-$data}"
					params={{ data: undefined }}
				>
					Jauna spēle
				</HomePrimaryButton>

				{/* <div className="flex gap-4 justify-center">
					<a
						href="https://github.com/leqwasd/zolite"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white py-3 px-6 rounded-lg font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-white/30"
					>
						⭐ GitHub
					</a>
				</div> */}
			</div>

			<RecentGamesSection />
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: Index,
});
