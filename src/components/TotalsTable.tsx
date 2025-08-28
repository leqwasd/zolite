import { FC, useMemo } from "react";
import { PlayTypeEnum, GameWithScore, WinResult, Game } from "../types";
import { PlayTypeDisplay } from "./PlayTypeDisplay";

export const TotalsTable: FC<{
	games: GameWithScore[];
	players: string[];
	pules: number[];
}> = ({ games, players, pules }) => {
	const totals = useMemo(
		() =>
			games.length === 0
				? new Array<number>(players.length).fill(0)
				: games[games.length - 1].scores,
		[games, players.length],
	);
	return (
		<table className="w-full table-fixed text-white">
			<thead>
				<tr className="border-b border-emerald-400/30">
					<td className="w-15 pb-2 text-sm text-emerald-200">#</td>
					{players.map((name, i) => (
						<th
							key={i}
							className="pb-2 text-center font-semibold text-emerald-100"
						>
							{name}
						</th>
					))}
					<td className="pb-2" />
				</tr>
			</thead>
			<tbody>
				{games.map((game, i) => (
					<tr
						key={i}
						className={
							i % players.length === players.length - 1
								? "border-b border-emerald-400/40"
								: ""
						}
					>
						<td className="py-1 text-sm text-emerald-300">
							{i + 1}
						</td>
						{game.game[0] === PlayTypeEnum.Pule ? (
							<>
								<td colSpan={players.length}></td>
								<td className="py-1 text-center text-sm text-emerald-200">
									Kopējā pule
								</td>
							</>
						) : (
							<>
								{players.map((_, j) => (
									<GameCell
										key={j}
										player={j}
										game={game}
										players={players}
									/>
								))}
								<td className="py-1 text-center text-sm text-emerald-200">
									<PlayTypeDisplay type={game.game[0]} />
								</td>
							</>
						)}
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr className="border-t border-emerald-400/30">
					<td className="pt-2 font-bold text-emerald-100">Σ</td>
					{totals.map((total, i) => (
						<th
							key={i}
							className="pt-2 text-center text-lg font-bold text-emerald-100"
						>
							{total}
						</th>
					))}
					<td className="pt-2" />
				</tr>
				{pules.some((p) => p > 0) && (
					<tr className="border-t border-emerald-400/30">
						<td className="pt-2 font-bold text-emerald-100">
							Pules
						</td>
						{pules.map((count, i) => (
							<th
								key={i}
								className="pt-2 text-center text-lg font-bold text-emerald-100"
							>
								{count > 0 && count}
							</th>
						))}
					</tr>
				)}
			</tfoot>
		</table>
	);
};

const GameCell: FC<{
	player: number;
	game: GameWithScore;
	players: string[];
}> = ({ player, game, players }) => {
	const gameResultClassName = useGameResultClassName(player, game);
	return (
		<td className={"py-1 text-center " + gameResultClassName}>
			<span className="text-xs font-light text-emerald-200">
				<PulePoints
					game={game.game}
					player={player}
					players={players}
				/>
			</span>
			<span className="mx-3 font-semibold text-white">
				{game.scores[player]}
			</span>
			<span className="text-xs font-light text-emerald-200">
				<Diff diff={game.diff[player]} />
			</span>
		</td>
	);
};

const Diff: FC<{ diff: number }> = ({ diff }) =>
	useMemo(() => (diff > 0 ? `+${diff}` : `${diff}`), [diff]);

const PulePoints: FC<{ game: Game; player: number; players: string[] }> = ({
	game,
	player,
	players,
}) => {
	if (
		game[0] === PlayTypeEnum.Lielais &&
		game[1] === player &&
		game[3] !== -1
	) {
		if (game[3] === players.length) {
			// Izņēma kopējo puli
			return `pule (kopējā)`;
		} else if (game[3] !== player) {
			// Izņēma kāda cita puli
			return `pule (${players[game[3]]})`;
		}
		return `pule (savējā)`;
	}
	return null;
};

function useGameResultClassName(
	player: number,
	gameWithScore: GameWithScore,
): string {
	const { game } = gameWithScore;
	if (
		(game[0] === PlayTypeEnum.Lielais || game[0] === PlayTypeEnum.Zole) &&
		game[1] === player
	) {
		if (
			game[2] === WinResult.win61 ||
			game[2] === WinResult.win91 ||
			game[2] === WinResult.winAll
		) {
			return "bg-green-500/30 border border-green-400/50";
		} else {
			return "bg-red-500/30 border border-red-400/50";
		}
	} else if (game[0] === PlayTypeEnum.MazaZole && game[1] === player) {
		if (game[2]) {
			return "bg-green-500/30 border border-green-400/50";
		} else {
			return "bg-red-500/30 border border-red-400/50";
		}
	} else if (game[0] === PlayTypeEnum.Galdins && game[1] === player) {
		return "bg-red-500/30 border border-red-400/50";
	}

	return "";
}
