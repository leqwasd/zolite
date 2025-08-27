import { createFileRoute } from "@tanstack/react-router";
import { FC } from "react";
import { decompress, compress, fixUpGameState } from "../utils";
import { GameState } from "../types";
import { FlexLayout } from "../components/FlexLayout";
import { TotalsTable } from "../components/TotalsTable";
import { PanelLight } from "../components/Panels/PanelLight";
import { useGameContext } from "../GameContext/useGameContext";
import { GameContextProvider } from "../GameContext/GameContextProvider";
import { PlayerCard } from "../components/PlayerCard";

const RouteComponent: FC = () => {
	return (
		<GameContextProvider>
			<GamePage />
		</GameContextProvider>
	);
};

const GamePage: FC = () => {
	const { state, gamesWithScore } = useGameContext();
	const currentDealer =
		(state.dealer + state.games.length) % state.players.length;
	return (
		<div className="relative mx-auto flex max-w-6xl flex-col gap-3">
			<PanelLight>
				<TotalsTable games={gamesWithScore} players={state.players} />
			</PanelLight>
			<FlexLayout className="gap-3" id="players">
				{state.players.map((player, index) => (
					<PlayerCard
						key={index}
						player={player}
						playerIndex={index}
						currentDealer={currentDealer}
						playerCount={state.players.length}
						preGameActions={state.preGameActions}
						game={state.gameType}
					/>
				))}
			</FlexLayout>
		</div>
	);
};
function storeInLocalStorage(data: GameState | null) {
	if (data?.meta?.id == null) {
		return;
	}
	localStorage.setItem(`game-${data.meta.id}`, compress(data));
}
export const Route = createFileRoute("/game/$data")({
	component: RouteComponent,
	params: {
		parse: (params) => ({
			data: fixUpGameState(decompress<GameState>(params.data)),
		}),
		stringify: (params) => ({
			data: compress(params.data),
		}),
	},
	onEnter: ({ params }) => storeInLocalStorage(params.data),
	onStay: ({ params }) => storeInLocalStorage(params.data),
});
