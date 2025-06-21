export interface Team {
  id: string;
  name: string;
  player_count: number;
  region: string;
  country: string;
  players?: Player[];
}

export interface Player {
  id: string;
  first_name: string;
  last_name: string;
  team_id: string;
  team_name: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
  status: "success" | "error";
}
