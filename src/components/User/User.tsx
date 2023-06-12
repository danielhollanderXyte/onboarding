import { FC } from "react";
// import styles from "./Users.module.css";
import User from "../../Models/User";
import { Anchor } from "@mantine/core";

const UserItem: FC<User> = (props: User) => {
  console.log(props);
  return (
    <div>
      <Anchor href={`users/${props.id}`}>{props.text}</Anchor>
    </div>
  );
};

export default UserItem;
