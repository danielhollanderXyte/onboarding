import { FC, useState } from "react";
// import styles from "./Users.module.css";
import User from "../../Models/User";
import { Anchor } from "@mantine/core";
import { useParams } from "react-router-dom";

const UserItem: FC<User> = (props: User) => {
  const [users] = useState<User>(props); //I would have used this to store the users list
  let showUser = (
    <div>
      <Anchor href={`/users/${props.id}`}>{props.text}</Anchor>
    </div>
  );

  const { usersId } = useParams();
  if (usersId == users.id) return showUser;
  if (usersId == undefined) return showUser;
};

export default UserItem;
