export type Team = {
  id: string;
  name: string;
  player_count: number;
  region: string;
  country: string;
};

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: "success" | "error";
}
