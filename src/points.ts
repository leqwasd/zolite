import { Game, PlayTypeEnum, LoseResult, WinResult } from "./types";

const PointTable = {
	GaldinsLosePerPlayer: -2,
	MazaZoleWinPerPlayer: 6,
	MazaZoleLossPerPlayer: -7,
	LielaisWin: 1,
	LielaisWinJanos: 2,
	LielaisWinBezstiki: 3,
	LielaisLost: -2,
	LielaisLostJanos: -3,
	LielaisLostBezstiki: -4,
	ZoleWin: 5,
	ZoleWinJanos: 6,
	ZoleWinBezstiki: 7,
	ZoleLost: -6,
	ZoleLostJanos: -7,
	ZoleLostBezstiki: -8,
};

export function getPointsForGameForPlayer(
	game: Game,
	player: number,
	playerCount: number,
) {
	const modifier = playerCount - 1;
	switch (game[0]) {
		case PlayTypeEnum.Galdins:
			if (game[1] == player) {
				return PointTable.GaldinsLosePerPlayer * modifier;
			} else {
				return -PointTable.GaldinsLosePerPlayer;
			}
		case PlayTypeEnum.MazaZole:
			if (game[2]) {
				if (game[1] === player) {
					return PointTable.MazaZoleWinPerPlayer * modifier;
				} else {
					return -PointTable.MazaZoleWinPerPlayer;
				}
			} else {
				if (game[1] === player) {
					return PointTable.MazaZoleLossPerPlayer * modifier;
				} else {
					return -PointTable.MazaZoleLossPerPlayer;
				}
			}
		case PlayTypeEnum.Lielais:
			switch (game[2]) {
				case WinResult.win61:
					return player === game[1]
						? PointTable.LielaisWin * modifier
						: -PointTable.LielaisWin;
				case WinResult.win91:
					return player === game[1]
						? PointTable.LielaisWinJanos * modifier
						: -PointTable.LielaisWinJanos;
				case WinResult.winAll:
					return player === game[1]
						? PointTable.LielaisWinBezstiki * modifier
						: -PointTable.LielaisWinBezstiki;
				case LoseResult.lost60:
					return player === game[1]
						? PointTable.LielaisLost * modifier
						: -PointTable.LielaisLost;
				case LoseResult.lost30:
					return player === game[1]
						? PointTable.LielaisLostJanos * modifier
						: -PointTable.LielaisLostJanos;
				case LoseResult.lostAll:
					return player === game[1]
						? PointTable.LielaisLostBezstiki * modifier
						: -PointTable.LielaisLostBezstiki;
				default:
					return 0;
			}
		case PlayTypeEnum.Zole:
			switch (game[2]) {
				case WinResult.win61:
					return player === game[1]
						? PointTable.ZoleWin * modifier
						: -PointTable.ZoleWin;
				case WinResult.win91:
					return player === game[1]
						? PointTable.ZoleWinJanos * modifier
						: -PointTable.ZoleWinJanos;
				case WinResult.winAll:
					return player === game[1]
						? PointTable.ZoleWinBezstiki * modifier
						: -PointTable.ZoleWinBezstiki;
				case LoseResult.lost60:
					return player === game[1]
						? PointTable.ZoleLost * modifier
						: -PointTable.ZoleLost;
				case LoseResult.lost30:
					return player === game[1]
						? PointTable.ZoleLostJanos * modifier
						: -PointTable.ZoleLostJanos;
				case LoseResult.lostAll:
					return player === game[1]
						? PointTable.ZoleLostBezstiki * modifier
						: -PointTable.ZoleLostBezstiki;
				default:
					return 0;
			}
		case PlayTypeEnum.Pule:
			return 0;
	}
}
