import { DataTable } from "@/components/data-table";
import React from "react";
import { columns } from "./teams-table-columns";

export default function TeamsPage() {
  return (
    <div>
      <h1>Teams</h1>
      <DataTable
        columns={columns}
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
