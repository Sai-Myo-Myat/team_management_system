export const playersKeys = {
  all: ["players"] as const,
  list: () => [...playersKeys.all, "list"] as const,
};
