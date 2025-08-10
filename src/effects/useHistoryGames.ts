import { useMemo } from "react";
import { GameState } from "../types";
import { decompress } from "../utils";

export function useHistoryGames() {
	return useMemo(() => {
		const games: GameState[] = [];

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key?.startsWith("game-")) {
				try {
					const data = localStorage.getItem(key);
					if (data) {
						const state = decompress<GameState>(data);
						games.push(state);
					}
				} catch (error) {
					console.warn(`Failed to parse saved game ${key}:`, error);
				}
			}
		}
		return games.sort(
			(a, b) =>
				new Date(b.meta.date).getTime() -
				new Date(a.meta.date).getTime(),
		);
	}, []);
}
