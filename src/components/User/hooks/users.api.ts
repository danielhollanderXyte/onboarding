import { getData } from "../../../api/api.utils.ts";
import { useQuery, type UseQueryResult } from "react-query";
import { type User } from "../User.types.ts";

export function useUser(id: string | undefined): UseQueryResult<User> {
  return useQuery<User>({
    queryKey: ["users", id],
    queryFn: async () =>
      await getData<User>(
        `https://jsonplaceholder.typicode.com/users/${
          id === undefined ? "" : id
        }`
      ),
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () =>
      await getData<User[]>("https://jsonplaceholder.typicode.com/users"),
  });
}
