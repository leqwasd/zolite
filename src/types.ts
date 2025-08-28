export const enum GameType {
	PGM = "PGM",
	PM = "PM",
}

export type Setup0 = [GameType];
export type Setup1 = [...Setup0, number];
export type Setup2 = [...Setup1, string[]];
export type Setup3 = [...Setup2, number];
export type SetupData = Setup0 | Setup1 | Setup2 | Setup3;

export const enum PlayTypeEnum {
	Galdins = 0,
	MazaZole = 1,
	Zole = 2,
	Lielais = 3,
	Pule = 4,
}

export type PlayTypeGaldins = [type: PlayTypeEnum.Galdins];
export type PlayTypeMazaZole = [type: PlayTypeEnum.MazaZole, player: number];
export type PlayTypeZole = [type: PlayTypeEnum.Zole, player: number];
export type PlayTypeLielais = [type: PlayTypeEnum.Lielais, player: number];
export type PlayTypePule = [type: PlayTypeEnum.Pule];
export type PlayType =
	| PlayTypeGaldins
	| PlayTypeMazaZole
	| PlayTypeZole
	| PlayTypeLielais
	| PlayTypePule;

export type GameMeta = {
	id: string;
	date: string;
};
export const enum VersionEnum {
	V1 = 1,
}
export type GameState = {
	version: VersionEnum;
	meta: GameMeta;
	type: GameType;
	pules: number[];
	players: string[];
	dealer: number;
	games?: Game[];
	preGameActions?: number;
	gameType?: PlayType | null;
};
export type Game =
	| PlayTypeGaldinsResult
	| PlayTypeMazaZoleResult
	| PlayTypeZoleResult
	| PlayTypeLielaisResult
	| PlayTypePuleResult;
export type GameWithScore = { game: Game; scores: number[]; diff: number[] };
export type PlayTypePuleResult = [...PlayTypePule, date: string];
export type PlayTypeGaldinsResult = [
	...PlayTypeGaldins,
	loser: number,
	date: string,
];
export type PlayTypeMazaZoleResult = [
	...PlayTypeMazaZole,
	result: number,
	date: string,
];
export type PlayTypeZoleResult = [
	...PlayTypeZole,
	result: WinResult | LoseResult,
	date: string,
];
export type PlayTypeLielaisResult = [
	...PlayTypeLielais,
	result: WinResult | LoseResult,
	pule: number,
	date: string,
];

export const enum WinResult {
	win61 = 1,
	win91 = 2,
	winAll = 3,
}
export const enum LoseResult {
	lost60 = -1,
	lost30 = -2,
	lostAll = -3,
}
export function convertGameStateFromSetup(setup: Setup3): GameState {
	const [type, playerCount, players, dealer] = setup;
	return {
		version: VersionEnum.V1,
		type,
		players,
		dealer,
		pules: Array.from({ length: playerCount + 1 }, () => 0),
		meta: {
			id: crypto.randomUUID(),
			date: new Date().toISOString(),
		},
	};
}
