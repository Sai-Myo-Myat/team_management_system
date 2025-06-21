"use client";

import { DataTable } from "@/components/data-table";
import React, { useCallback, useEffect, useState } from "react";
import { columns, TeamsTableMeta } from "./teams-table-columns";
import { useModal } from "@/context/modal-context";
import { useTeams } from "@/api/team-api";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function TeamsPage() {
  const { openModal } = useModal();
  const { getTeamById, getTeams } = useTeams();
  const [teams, setTeams] = useState([]);
  const onUpdatePress = useCallback(
    (id: string) => {
      const teamToUpdate = getTeamById(id);
      openModal("TEAM_MODAL", teamToUpdate);
    },
    [openModal, getTeamById]
  );

  const onCreatePress = useCallback(() => {
    openModal("TEAM_MODAL");
  }, [openModal]);

  // Initial load of teams
  useEffect(() => {
    if (!teams.length) {
      const initialTeams = getTeams();
      setTeams(initialTeams);
    }
  }, [getTeams, teams.length]);

  // Listen for updates to teams
  useEffect(() => {
    const handleTeamsUpdated = () => {
      setTeams(getTeams());
    };
    window.addEventListener("teamsUpdated", handleTeamsUpdated);
    return () => window.removeEventListener("teamsUpdated", handleTeamsUpdated);
  }, [getTeams]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1>Teams</h1>
        <Button className="cursor-pointer" onClick={onCreatePress}>
          <PlusIcon />
          Create
        </Button>
      </div>
      <DataTable
        columns={columns}
        meta={{ updateTeam: onUpdatePress } as TeamsTableMeta}
        data={teams || []}
        initialState={{
          columnVisibility: {
            id: false,
          },
        }}
      />
    </div>
  );
}
