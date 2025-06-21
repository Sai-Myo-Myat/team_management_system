"use client";

import { DataTable } from "@/components/data-table";
import React, { useCallback } from "react";
import { columns, TeamsTableMeta } from "./teams-table-columns";
import { useModal } from "@/context/modal-context";

export default function TeamsPage() {
  const { openModal } = useModal();
  const onUpdatePress = useCallback(
    (id: string) => {
      openModal("UPDATE_TEAM", {
        teamId: id,
        teamName: "Team One",
        country: "Thailand",
        region: "Asia",
        playerCount: 5,
      });
    },
    [openModal]
  );

  return (
    <div>
      <h1>Teams</h1>
      <DataTable
        columns={columns}
        meta={{ updateTeam: onUpdatePress } as TeamsTableMeta}
        data={[
          {
            id: "1",
            name: "Team One",
            country: "Thailand",
            region: "Aisa",
            player_count: 5,
          },
          {
            id: "2",
            name: "Team Two",
            country: "USA",
            region: "North America",
            player_count: 4,
          },
          {
            id: "3",
            name: "Team Three",
            country: "Germany",
            region: "Europe",
            player_count: 6,
          },
          {
            id: "4",
            name: "Team Four",
            country: "Brazil",
            region: "South America",
            player_count: 3,
          },
          {
            id: "5",
            name: "Team Five",
            country: "Australia",
            region: "Oceania",
            player_count: 7,
          },
        ]}
      />
    </div>
  );
}
