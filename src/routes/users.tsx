import UserItem from "../components/User/User";
import { FC } from "react";
import User from "../Models/User";

interface UserList {
  userList: User[];
}

const Users: FC<UserList> = (props: UserList) => {
  return props.userList.map((user) => (
    <UserItem key={user.id} text={user.text} id={user.id}></UserItem>
  ));
};

export default Users;
