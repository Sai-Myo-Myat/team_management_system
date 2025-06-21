"use client";

import { DataTable } from "@/components/data-table";
import React, { useCallback, useEffect, useState } from "react";
import { columns, TeamsTableMeta } from "./teams-table-columns";
import { useModal } from "@/context/modal-context";
import { useTeams } from "@/api/team-api";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import DeleteComfirmationModal from "@/components/modals/delete-confirmation-modal";

export default function TeamsPage() {
  const { openModal } = useModal();
  const { getTeamById, getTeams, removeTeam } = useTeams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [teams, setTeams] = useState([]);
  const onUpdatePress = useCallback(
    (id: string) => {
      const teamToUpdate = getTeamById(id);
      openModal("TEAM_MODAL", teamToUpdate);
    },
    [openModal, getTeamById]
  );

  const onRemovePress = useCallback((id: string) => {
    setDialogOpen(true);
    setIdToDelete(id);
  }, []);

  const onDeleteConfirm = useCallback(() => {
    removeTeam(idToDelete);
    setDialogOpen(false);
    setIdToDelete("");
  }, [removeTeam, idToDelete]);

  const onCancelDelete = useCallback(() => {
    setDialogOpen(false);
    setIdToDelete("");
  }, []);

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
        meta={
          {
            updateTeam: onUpdatePress,
            removeTeam: onRemovePress,
          } as TeamsTableMeta
        }
        data={teams || []}
        initialState={{
          columnVisibility: {
            id: false,
          },
        }}
      />
      <DeleteComfirmationModal
        open={dialogOpen}
        onCancel={onCancelDelete}
        onDelete={onDeleteConfirm}
      />
    </div>
  );
}
