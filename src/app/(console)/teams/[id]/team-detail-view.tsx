"use client";
import { useTeams } from "@/api/team-api";
import Box from "@/components/box";
import { Player, Team } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  id: string;
}
const TeamDetailView: React.FC<Props> = ({ id }) => {
  console.log("Team Detail View Props", id);
  const { getTeamById } = useTeams();
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    console.log("Team Detail View Mounted", team);
    if (!team) {
      const teamFromStorage = getTeamById(id);
      setTeam(teamFromStorage);
    }
  }, [getTeamById, id, team]);

  if (!team) {
    return (
      <div className="flex items-center justify-center min-h-screen font-semibold text-destructive">
        <p>Team not found.</p>
      </div>
    );
  }
  return (
    <Box className="p-4">
      <div className="w-full md:w-1/2 lg:w-1/3">
        <h3 className="font-semibold mb-4">{team.name}</h3>
        <DetailItem label="Region:" value={team.region} />
        <DetailItem label="Country:" value={team.country} />
        <DetailItem label="Player Count:" value={team.player_count} />
        <div>
          <h3 className="font-semibold mt-8 mb-4">Players</h3>
          <ol className="px-8 list-decimal">
            {team.players?.map((player: Player) => (
              <li key={player.id} className="mb-2">
                {player.first_name} {player.last_name}
              </li>
            )) || <p>No players in this team.</p>}
          </ol>
        </div>
      </div>
    </Box>
  );
};

interface DetailItemProps {
  label: string;
  value: string | number;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => {
  return (
    <div className="mb-2 flex items-center justify-between border-b p-2">
      <strong className="text-sm">{label}</strong> <span>{value}</span>
    </div>
  );
};
export default TeamDetailView;
