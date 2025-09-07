import { type FileRouteTypes } from "./src/routeTree.gen";
import { Sitemap } from "tanstack-router-sitemap";
import fs from "fs";
import { GameState, GameType, SetupData, VersionEnum } from "./src/types";
import LZString from "lz-string";

function compress<T>(data: T): string {
	return LZString.compressToEncodedURIComponent(JSON.stringify(data));
}
async function getLastModified(...filePaths: string[]): Promise<Date> {
	if (filePaths.length === 0) {
		throw new Error("No file paths provided");
	}
	const dates = await Promise.all(filePaths.map(getLastModifiedForFile));
	let latest = dates[0];
	for (let i = 0; i < dates.length; i++) {
		if (dates[i] > latest) {
			latest = dates[i];
		}
	}
	return latest;
}

function getLastModifiedForFile(filePath: string): Promise<Date> {
	return new Promise((resolve, reject) => {
		fs.stat(filePath, (err, stats) => {
			if (err) {
				reject(err);
			} else {
				resolve(stats.mtime);
			}
		});
	});
}

// Define your sitemap
export const sitemap: Sitemap<FileRouteTypes["fullPaths"]> = {
	siteUrl: "https://leqwasd.github.io/zolite/?",
	routes: {
		"/": async () => ({
			lastModified: await getLastModified("src/routes/index.tsx"),
		}),
		"/history": async () => ({
			lastModified: await getLastModified("src/routes/history.tsx"),
		}),
		"/game/$data": async () => {
			const lastModified = await getLastModified(
				"src/routes/game.$data.tsx",
				"src/components/TotalsTable.tsx",
			);
			return [
				{
					path: `/game/${compress({
						version: VersionEnum.V1,
						type: GameType.PGM,
						players: ["Player 1", "Player 2", "Player 3"],
						dealer: 0,
						pules: Array.from({ length: 3 + 1 }, () => 0),
						meta: {
							id: "8a215020-ba7f-463f-8721-4b63fb02fb06",
							date: "2025-09-07T10:27:44.448Z",
						},
					} satisfies GameState)}`,
					lastModified,
				},
			];
		},
		"/new/{-$data}": async () => {
			const lastModified = await getLastModified(
				"src/routes/new.{-$data}.tsx",
			);
			return [
				{
					path: "/new",
					lastModified,
				},
				{
					path: `/new/${compress([GameType.PGM] satisfies SetupData)}`,
					lastModified,
				},
				{
					path: `/new/${compress([GameType.PGM, 3] satisfies SetupData)}`,
					lastModified,
				},
				{
					path: `/new/${compress([GameType.PGM, 3, ["Player 1", "Player 2", "Player 3"]] satisfies SetupData)}`,
					lastModified,
				},
				{
					path: `/new/${compress([GameType.PGM, 3, ["Player 1", "Player 2", "Player 3"], 0] satisfies SetupData)}`,
					lastModified,
				},
			] as never;
		},
	},
};
