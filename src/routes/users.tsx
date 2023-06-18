import { UserItem } from "../components/User/UserItem.tsx";
import { config } from "../components/User/user.config.ts";
import User from "../components/User/User.types.ts";
import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useGet.ts";

export function Users() {
  const { userId } = useParams();
  const { isLoading, isError, data } = useGet(config.url, userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Oh no!</div>;
  }
  //Changed this to be more meaningful name as "data" is not very descriptive
  let usersData = data;
  console.log(usersData);

  return usersData?.map((user: User) => (
    <UserItem
      name={user.name}
      id={user.id}
      username={user.username}
      email={user.email}
      key={user.id}
    />
  ));
}
