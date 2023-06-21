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
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { type User } from "../components/User/User.types.ts";
import { IconAlertCircle, IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";

export function Users() {
  const users = useUsers();
  const [usersData, setUsersData] = useState<User[]>(users.data ?? []);

  const adjustedData = useMemo(
    () =>
      usersData === undefined || usersData.length === 0
        ? users.data
        : usersData,
    [users.data, usersData]
  );

  useEffect(() => {
    setUsersData(users.data ?? []);
  }, [users.data]);

  const handleDelete = useCallback(
    (row: User) => {
      setUsersData((prevPostsData) => {
        return prevPostsData?.filter((user) => user.id !== row.id);
      });
    },
    [users.data]
  );

  const columns = useMemo(() => {
    return [
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
        cellRenderer: (row: User) => (
          <Stack>
            <Text>{row.address.city}</Text>
            <Text>{row.address.street}</Text>
          </Stack>
        ),
      },
      {
        columnName: "delete",
        exactMatch: true,
        header: "",
        cellRenderer: (row) => {
          return (
            <Button
              variant="default"
              color="reds"
              onClick={() => {
                handleDelete(row);
              }}
            >
              <IconX aria-label="Delete" color="red" />
            </Button>
          );
        },
      },
    ];
  }, []);

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

  if (adjustedData === undefined) return null;

  /*
   return <TableComponent rows={users.data} headers={config.table.headers} />;
  */
  const data = adjustedData.map((user, index) => ({
    ...user,
    id: !isNaN(user.id) ? user.id : index + 1,
    // I tried to avoid it...with the handleNestedObject util
    addressCombined: user.address.city + user.address.street,
  }));
  return <Table data={data} columns={columns} />;
}
