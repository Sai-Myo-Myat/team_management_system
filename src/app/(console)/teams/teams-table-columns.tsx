"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/table-actions-column";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Team } from "@/types";
import Link from "next/link";

export type TeamsTableMeta = {
  updateTeam: (id: string) => void;
  removeTeam: (id: string) => void;
};

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/teams/${row.getValue("id")}`}
        className="font-semibold text-primary hover:underline"
      >
        {row.getValue("name")}
      </Link>
    ),
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
  {
    accessorKey: "actions",
    header: () => <div></div>,
    cell: ({ row, table }) => (
      <ActionColumn
        row={row}
        renderMenuItems={(row) => (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                (table.options.meta as TeamsTableMeta).updateTeam(
                  row.getValue("id")
                )
              }
            >
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive font-semibold cursor-pointer"
              onClick={() =>
                (table.options.meta as TeamsTableMeta).removeTeam(
                  row.getValue("id")
                )
              }
            >
              Remove
            </DropdownMenuItem>
          </>
        )}
      />
    ),
  },
];
