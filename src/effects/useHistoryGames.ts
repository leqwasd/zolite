import { useMemo } from "react";
import { GameState } from "../types";
import { decompress } from "../utils";

export type HistoryGame = {
	state: GameState;
	date: Date;
};

export function useHistoryGames() {
	return useMemo(() => {
		const games: HistoryGame[] = [];

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key?.startsWith("game-")) {
				try {
					const data = localStorage.getItem(key);
					if (data) {
						const state = decompress<GameState>(data);
						let date: Date = null!;
						if (state.games?.length) {
							const lastGame =
								state.games[state.games.length - 1];
							const lastParam = lastGame[lastGame.length - 1];
							if (typeof lastParam === "string") {
								const d = new Date(lastParam);
								if (!isNaN(+d)) {
									date = d;
								}
							}
						}

						if (date == null) {
							date = new Date(state.meta.date);
						}

						games.push({ state, date });
					}
				} catch (error) {
					console.warn(`Failed to parse saved game ${key}:`, error);
				}
			}
		}
		return games.sort((a, b) => b.date.getTime() - a.date.getTime());
	}, []);
}
