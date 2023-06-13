import UserItem from "../components/User/User";
import { FC, useState } from "react";
import User from "../Models/User";
import { useParams } from "react-router-dom";

interface UsersList {
  usersList: User[];
}

const Users: FC<UsersList> = (props: UsersList) => {
  return props.usersList.map((user) => (
    <UserItem key={user.id} text={user.text} id={user.id}></UserItem>
  ));
};

export default Users;
