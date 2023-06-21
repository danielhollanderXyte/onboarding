import { Tabs, Anchor, Box, createStyles } from "@mantine/core";
import { IconMessage, IconUser, IconHome } from "@tabler/icons-react";
import { Outlet, Link } from "react-router-dom";
import { type ReactElement } from "react";

export function Root(): ReactElement {
  const { classes } = useStyles();

  return (
    <Box>
      <Tabs defaultValue="gallery" className={classes.container}>
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

      <Box id="detail" className={classes.detail}>
        <Outlet />
      </Box>
    </Box>
  );
}
const useStyles = createStyles(() => ({
  container: {
    display: "grid",
    gridTemplateRows: "min-content 1fr",
  },
  detail: {
    height: "100%",
  },
}));
