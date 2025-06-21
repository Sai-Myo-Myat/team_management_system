// create PlayerItem component with assign and remove to teams buttons. Only show assign button if player is not in a team. On click of assign button, show a dropdown menu with a list of teams to select from. On click of remove button, remove player from team.
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useTeams } from "@/api/team-api";
import { Player, Team } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { playersKeys } from "@/api/query-keys/players-keys";

interface PlayerItemProps {
  player: Player;
}
export default function PlayerItem({ player }: PlayerItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getTeams, assignPlayerToTeam, removePlayerFromTeam } = useTeams();
  const queryClient = useQueryClient();

  const handleAssignPlayer = (teamId: string) => {
    assignPlayerToTeam(teamId, player);
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: playersKeys.list() });
  };

  const handlerRemovePlayer = () => {
    removePlayerFromTeam(player.team_id, player.id);
    queryClient.invalidateQueries({ queryKey: playersKeys.list() });
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h3 className="font-semibold">
          {player.first_name} {player.last_name}
        </h3>
        <p>{player.team_id ? player.team_name : "-"}</p>
      </div>

      {player.team_id ? (
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={handlerRemovePlayer}
        >
          Remove
        </Button>
      ) : (
        <DropdownMenu open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              Assign to Team
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {getTeams()?.map((team: Team) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={team.id}
                onClick={() => handleAssignPlayer(team.id)}
              >
                {team.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
