export const getPlayers = async (params: {
  limit?: number;
  offset?: number;
}) => {
  const { limit = 10, offset = 0 } = params;
  const response = await fetch(`/api/players?limit=${limit}&offset=${offset}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch players");
  }

  return response.json();
};
