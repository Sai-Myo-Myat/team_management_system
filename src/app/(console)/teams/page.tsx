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
  const [idToDelete, setIdToDelete] = useState("");
  const [teams, setTeams] = useState(getTeams() || []);
  const onUpdatePress = useCallback(
    (id: string) => {
      const teamToUpdate = getTeamById(id);
      openModal("TEAM_MODAL", teamToUpdate);
    },
    [openModal, getTeamById]
  );

  const onRemovePress = useCallback((id: string) => {
    setIdToDelete(id);
  }, []);

  const onDeleteConfirm = useCallback(() => {
    removeTeam(idToDelete);
    setIdToDelete("");
  }, [removeTeam, idToDelete]);

  const onCancelDelete = useCallback(() => {
    setIdToDelete("");
  }, []);

  const onCreatePress = useCallback(() => {
    openModal("TEAM_MODAL");
  }, [openModal]);

  // // Listen for updates to teams
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
        open={!!idToDelete}
        onCancel={onCancelDelete}
        onDelete={onDeleteConfirm}
      />
    </div>
  );
}
