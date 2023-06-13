import User from "./User.types.ts";
import { Anchor } from "@mantine/core";
import { useParams } from "react-router-dom";

export function UserItem(props: User) {
  let showUser = (
    <div>
      <Anchor href={`/users/${props.id}`}>{props.text}</Anchor>
    </div>
  );

  const { usersId } = useParams();
  if (usersId == props.id) return showUser;
  if (usersId == undefined) return showUser;
}
