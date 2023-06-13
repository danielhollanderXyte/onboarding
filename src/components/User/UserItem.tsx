import User from "./User.types.ts";
import { Anchor } from "@mantine/core";

export function UserItem(props: User) {
  return (
    <div>
      <Anchor href={`/users/${props.id}`}>
        <h4>{props.name}</h4>
        <div>{props.email}</div>
      </Anchor>
    </div>
  );
}
