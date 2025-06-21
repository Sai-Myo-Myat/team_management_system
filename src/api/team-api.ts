"use client";
import { ApiResponse, Team } from "@/types";

const checkDuplicateTeam = (teams: Team[], newTeam: Team): boolean => {
  return teams.some(
    (team) => team.name === newTeam.name && team.id !== newTeam.id
  );
};

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

  const createTeam = (team: Team): ApiResponse<Team[]> => {
    const teams = getTeams();
    const isDuplicate = checkDuplicateTeam(teams, team);
    if (isDuplicate) {
      return {
        data: teams,
        status: "error",
        error: "Team with this name already exists.",
      };
    }
    teams.push(team);
    saveTeams(teams);
    return {
      data: teams,
      status: "success",
      error: undefined,
    };
  };

  const updateTeam = (id: string, updatedTeam: Team): ApiResponse<Team[]> => {
    let teams = getTeams();
    const isDuplicate = checkDuplicateTeam(teams, { ...updatedTeam, id });
    if (isDuplicate) {
      return {
        data: teams,
        status: "error",
        error: "Team with this name already exists.",
      };
    }
    teams = teams.map((team: Team) =>
      team.id === id ? { ...team, ...updatedTeam } : team
    );
    saveTeams(teams);
    return {
      data: teams,
      status: "success",
      error: undefined,
    };
  };

  return { getTeams, getTeamById, createTeam, updateTeam };
};
