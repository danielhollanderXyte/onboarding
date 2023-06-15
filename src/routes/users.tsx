import { useUsers } from "../components/User/hooks/users.api.ts";
import { Table } from "../components/Table/Table.tsx";
import { Anchor, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { User } from "../components/User/User.types.ts";
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
      },
      {
        columnName: "username",
        header: "Username",
        exactMatch: false,
      },
      {
        columnName: "email",
        header: "Email",
        exactMatch: false,
      },
      {
        columnName: "addressCombined",
        header: "Street",
        exactMatch: false,
      },
      {
        columnName: "address",
        header: "Street",
        exactMatch: false,
        cellRenderer: (row: User) => (
          <Stack>
            <Text>{row.address.city}</Text>
            <Text>{row.address.street}</Text>
          </Stack>
        ),
      },
    ],
  },
};

export function Users() {
  const users = useUsers();

  if (users.isLoading) {
    return <div>Loading...</div>;
  }

  if (users.isError) {
    return <div>Error: Oh no!</div>;
  }

  if (!users.isFetched) {
    return <div>Loading...</div>;
  }

  if (users.data === undefined) return null;

  /*
   return <TableComponent rows={users.data} headers={config.table.headers} />;
  */
  const data = users.data.map((user, index) => ({
    ...user,
    id: user.id ? user.id : index + 1,
    addressCombined: `${user.address.street}, ${user.address.city}`,
  }));
  return <Table data={data} columns={config.table.columns} />;
}
