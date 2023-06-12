import { Tabs, Anchor } from "@mantine/core";
import { IconMessage, IconUser, IconHome } from "@tabler/icons-react";
import { Outlet } from "react-router-dom";
import usersList from "../components/User/users";

export function loader() {
  return usersList;
}

function Root() {
  return (
    <>
      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="Home" icon={<IconHome size="1rem" />}>
            <Anchor href="/">Home</Anchor>
          </Tabs.Tab>
          <Tabs.Tab value="Users" icon={<IconUser size="1rem" />}>
            <Anchor href="/users">Users</Anchor>
          </Tabs.Tab>
          <Tabs.Tab value="Posts" icon={<IconMessage size="1rem" />}>
            <Anchor href="/posts">Posts</Anchor>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <div id="detail">
        <Outlet />
      </div>
    </>

    //Insteaed of routing I would have just use the tabnine tabs
    //Seems more elegant in this case
    /*
          <Tabs.Panel value="gallery" pt="xs">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel>
    */
  );
}

export default Root;
