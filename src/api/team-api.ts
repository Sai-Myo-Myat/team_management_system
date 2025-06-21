"use client";
import { Team } from "@/types";

// read teams from local storate
export const useTeams = () => {
  const getTeams = () => {
    const teams = window.localStorage.getItem("teams");
    return teams ? JSON.parse(teams) : [];
  };

  const getTeamById = (id: string) => {
    const teams = getTeams();
    return teams.find((team: Team) => team.id === id);
  };

  const saveTeams = (teams: Team[]) => {
    localStorage.setItem("teams", JSON.stringify(teams));
    // Dispatch an event to notify that teams have been updated
    window.dispatchEvent(new Event("teamsUpdated"));
  };

  const createTeam = (team: Team) => {
    const teams = getTeams();
    teams.push(team);
    saveTeams(teams);
  };

  const updateTeam = (id: string, updatedTeam: Team) => {
    let teams = getTeams();
    teams = teams.map((team: Team) =>
      team.id === id ? { ...team, ...updatedTeam } : team
    );
    saveTeams(teams);
  };

  return { getTeams, getTeamById, createTeam, updateTeam };
};
