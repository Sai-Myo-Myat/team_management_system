"use client";
import { ApiResponse, Player, Team } from "@/types";

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

  const getTeamByPlayerId = (playerId: string) => {
    const teams = getTeams();
    return teams.find((team: Team) =>
      team.players?.some((player: Player) => player.id === playerId)
    );
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

  const removeTeam = (id: string): ApiResponse<Team[]> => {
    let teams = getTeams();
    teams = teams.filter((team: Team) => team.id !== id);
    saveTeams(teams);
    return {
      data: teams,
      status: "success",
      error: undefined,
    };
  };

  const assignPlayerToTeam = (
    teamId: string,
    player: Player
  ): ApiResponse<Team> => {
    const teams = getTeams();
    const teamIndex = teams.findIndex((team: Team) => team.id === teamId);
    if (teamIndex === -1) {
      return {
        data: null,
        status: "error",
        error: "Team not found.",
      };
    }

    // Add player to the team
    if (!teams[teamIndex].players) {
      teams[teamIndex].players = [];
    }
    teams[teamIndex].players.push(player);

    saveTeams(teams);

    return {
      data: teams[teamIndex],
      status: "success",
      error: undefined,
    };
  };

  const removePlayerFromTeam = (
    teamId: string,
    playerId: string
  ): ApiResponse<Team> => {
    const teams = getTeams();
    const teamIndex = teams.findIndex((team: Team) => team.id === teamId);
    if (teamIndex === -1) {
      return {
        data: null,
        status: "error",
        error: "Team not found.",
      };
    }
    // Remove player from the team
    teams[teamIndex].players = teams[teamIndex].players?.filter(
      (player: Player) => player.id !== playerId
    );
    saveTeams(teams);
    return {
      data: teams[teamIndex],
      status: "success",
      error: undefined,
    };
  };

  return {
    getTeams,
    getTeamById,
    getTeamByPlayerId,
    createTeam,
    updateTeam,
    removeTeam,
    assignPlayerToTeam,
    removePlayerFromTeam,
  };
};
