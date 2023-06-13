import { UserItem } from "../components/User/User.tsx";
import User from "../components/User/User.types.ts";

interface UsersList {
  usersList: User[];
}

export function Users(props: UsersList) {
  return props.usersList.map((user) => (
    <UserItem key={user.id} text={user.text} id={user.id}></UserItem>
  ));
}
