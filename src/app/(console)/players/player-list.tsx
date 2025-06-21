"use client";
import { useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { playersKeys } from "@/api/query-keys/players-keys";
import { getPlayers } from "@/api/players-api";
import { flatten } from "lodash-es";
import { Button } from "@/components/ui/button";
import PlayerItem from "./player-item";
import Box from "@/components/box";
import { useTeams } from "@/api/team-api";

const pageSize = 10; // Number of players per page

export default function PlayerList() {
  const { getTeamByPlayerId } = useTeams();
  const {
    data,
    isError,
    error,
    isLoading,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: playersKeys.list(),
    queryFn: ({ pageParam }) => getPlayers(pageParam),
    initialPageParam: { limit: pageSize, offset: 0 },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage) {
        const hasMorePage = !!lastPage.meta?.next_cursor;
        if (!hasMorePage) {
          return undefined;
        }

        return { limit: pageSize, offset: pages.length * pageSize };
      }

      return { limit: pageSize, offset: 0 };
    },
  });

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen font-semibold text-destructive">
        <Box>
          <p>{error.message}</p>
        </Box>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen font-semibold text-destructive">
        <Box>
          <p>Loading...</p>
        </Box>
      </div>
    );

  const players = flatten(data?.pages.map((r) => r.data || []));

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">NBA Players</h2>
      <ul>
        {players?.map((player) => {
          const team = getTeamByPlayerId(player.id);
          return (
            <PlayerItem
              key={player.id}
              player={{
                id: player.id,
                first_name: player.fast_name,
                last_name: player.last_name,
                team_id: team?.id || "",
                team_name: team?.name || "",
              }}
            />
          );
        })}
      </ul>
      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            className="cursor-pointer my-4"
            onClick={handleLoadMore}
            disabled={isLoading || isPending}
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
