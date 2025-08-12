import {
	compressToEncodedURIComponent,
	decompressFromEncodedURIComponent,
} from "lz-string";
export function compress<T>(data: T): string {
	return compressToEncodedURIComponent(JSON.stringify(data));
}

export function decompress<T>(data: string): T {
	return JSON.parse(decompressFromEncodedURIComponent(data)) as T;
}
const actionMap = new Map([
	[3, [2, 0, 1]],
	[4, [null, 0, 1, 2]],
	[5, [null, 0, null, 1, 2]],
]);

export function getRoka(
	currentDealer: number,
	playerCount: number,
	playerIndex: number,
): number | null {
	const actions = actionMap.get(playerCount);
	if (actions == null) {
		return null;
	}
	// Calculate the relative position from the dealer
	const idx = (playerIndex - currentDealer + playerCount) % playerCount;
	return actions[idx];
}

export function shouldGiveAction(
	currentDealer: number,
	preGameActions: number,
	playerCount: number,
	playerIndex: number,
): boolean {
	return getRoka(currentDealer, playerCount, playerIndex) === preGameActions;
}

export function isPlayerInGame(
	currentDealer: number,
	playerCount: number,
	playerIndex: number,
) {
	return getRoka(currentDealer, playerCount, playerIndex) !== null;
}

export function findPlayerWithAction(
	currentDealer: number,
	preGameActions: number,
	playerCount: number,
) {
	for (let i = 0; i < playerCount; i++) {
		if (shouldGiveAction(currentDealer, preGameActions, playerCount, i)) {
			return i;
		}
	}
	return null;
}
export function findPlayerWithFirstRoka(
	currentDealer: number,
	playerCount: number,
) {
	for (let i = 0; i < playerCount; i++) {
		if (getRoka(currentDealer, playerCount, i) === 0) {
			return i;
		}
	}
	return null;
}
