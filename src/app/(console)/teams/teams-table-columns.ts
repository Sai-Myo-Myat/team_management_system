"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Team = {
  id: string;
  name: string;
  player_count: number;
  region: string;
  country: string;
};

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "player_count",
    header: "Player Count",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
];
