import { Tabs, Anchor } from "@mantine/core";
import { IconMessage, IconUser, IconHome } from "@tabler/icons-react";
import { Outlet, Link } from "react-router-dom";
import { type ReactElement } from "react";

function Root(): ReactElement {
  return (
    <>
      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Anchor component={Link} to="/">
            <Tabs.Tab value="Home" icon={<IconHome size="1rem" />}>
              Home
            </Tabs.Tab>
          </Anchor>
          <Anchor component={Link} to="/users">
            <Tabs.Tab value="Users" icon={<IconUser size="1rem" />}>
              Users
            </Tabs.Tab>
          </Anchor>
          <Anchor component={Link} to="/posts">
            <Tabs.Tab value="Posts" icon={<IconMessage size="1rem" />}>
              Posts
            </Tabs.Tab>
          </Anchor>
        </Tabs.List>
      </Tabs>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
