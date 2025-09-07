import { type FileRouteTypes } from "./src/routeTree.gen";
import { Sitemap } from "tanstack-router-sitemap";
import fs from "fs";
import { convertGameStateFromSetup, GameType, SetupData } from "./src/types";
import LZString from "lz-string";

function compress<T>(data: T): string {
	return LZString.compressToEncodedURIComponent(JSON.stringify(data));
}
async function getLastModified(filePath: string): Promise<Date> {
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
	siteUrl: "https://leqwasd.github.io/zolite",
	routes: {
		"/": async () => ({
			lastModified: await getLastModified("src/routes/index.tsx"),
		}),
		"/history": async () => ({
			path: "/?/history",
			lastModified: await getLastModified("src/routes/history.tsx"),
		}),
		"/game/$data": async () => {
			const lastModified = await getLastModified(
				"src/routes/game.$data.tsx",
			);
			return [
				{
					path: `/?/game/${convertGameStateFromSetup([GameType.PGM, 3, ["Player 1", "Player 2", "Player 3"], 0])}`,
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
					path: "/?/new",
					lastModified,
				},
				{
					path: `/?/new/${compress([GameType.PGM] satisfies SetupData)}`,
					lastModified,
				},
				{
					path: `/?/new/${compress([GameType.PGM, 3] satisfies SetupData)}`,
					lastModified,
				},
				{
					path: `/?/new/${compress([GameType.PGM, 3, ["Player 1", "Player 2", "Player 3"]] satisfies SetupData)}`,
					lastModified,
				},
				{
					path: `/?/new/${compress([GameType.PGM, 3, ["Player 1", "Player 2", "Player 3"], 0] satisfies SetupData)}`,
					lastModified,
				},
			] as never;
		},
	},
};
