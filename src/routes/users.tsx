import { useUsers } from "../components/User/hooks/users.api.ts";
import { Table } from "../components/Table/Table.tsx";
import {
  Anchor,
  Stack,
  Text,
  Loader,
  Alert,
  Center,
  Container,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { type User } from "../components/User/User.types.ts";
import { IconAlertCircle } from "@tabler/icons-react";

export const config = {
  table: {
    columns: [
      {
        columnName: "name",
        cellRenderer: (row: User) => {
          return (
            <Anchor component={Link} to={`./${row.id}`}>
              {row.name}
            </Anchor>
          );
        },
        header: "Name",
        exactMatch: false,
        sortDirection: "asc",
      },
      {
        columnName: "username",
        header: "Username",
        exactMatch: false,
        sortDirection: null,
      },
      {
        columnName: "email",
        header: "Email",
        exactMatch: false,
        sortDirection: null,
      },
      {
        columnName: "addressCombined",
        header: "Street",
        exactMatch: false,
        cellRenderer: (row: User) => (
          <Stack>
            <Text>{row.address.city}</Text>
            <Text>{row.address.street}</Text>
          </Stack>
        ),
        sortDirection: null,
      },
    ],
  },
};

export function Users() {
  const users = useUsers();

  if (users.isLoading) {
    return (
      <Center maw={400} h={100} mx="auto">
        <Loader />
      </Center>
    );
  }

  if (users.isError) {
    return (
      <Container size="30rem" px={10}>
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Bummer!"
          color="red"
        >
          Error: Oh no!
        </Alert>
      </Container>
    );
  }

  if (!users.isFetched) {
    return <Loader />;
  }

  if (users.data === undefined) return null;

  /*
   return <TableComponent rows={users.data} headers={config.table.headers} />;
  */
  const data = users.data.map((user, index) => ({
    ...user,
    id: !Number.isNaN(user.id) ? user.id : index + 1,
    // I tried to avoid it...with the handleNestedObject util
    addressCombined: user.address.city + user.address.street,
  }));
  return <Table data={data} columns={config.table.columns} />;
}
