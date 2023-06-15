import { getData } from "../../../api/api.utils.ts";
import { useQuery } from "react-query";
import { type User } from "../User.types.ts";

export function useUser(id: string) {
  return useQuery<User>({
    queryKey: ["users", id],
    queryFn: async () =>
      await getData<User>(`https://jsonplaceholder.typicode.com/users/${id}`),
  });
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () =>
      await getData<User[]>("https://jsonplaceholder.typicode.com/users"),
  });
}
