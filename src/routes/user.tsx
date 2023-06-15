import { useUser } from "../components/User/hooks/users.api.ts";
import { type ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Card, Text, Group, Container, Space } from "@mantine/core";

export function User(): ReactElement | ReactElement[] | null {
  const { userId } = useParams();
  const user = useUser(userId);

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.isError) {
    return <div>Error: Oh no!</div>;
  }
  if (user.data === null || user.data === undefined) return null;

  user.data.addressCombined = `${user.data.address.street}, ${user.data.address.city}`;
  return (
    <>
      <Space h="xs" />
      <Container size="35rem">
        <Card shadow="md" radius="md" withBorder>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={700}>{user.data.name}</Text>
          </Group>
          <Text>
            <strong>Username:</strong> {user.data.username}
          </Text>
          <Text>
            <strong>Email:</strong> {user.data.email}
          </Text>
          <Text>
            <strong>Address:</strong> {user.data.address.street},{" "}
            {user.data.address.suite}, {user.data.address.city},{" "}
            {user.data.address.zipcode}
          </Text>
          <Text>
            <strong>Phone:</strong> {user.data.phone}
          </Text>
          <Text>
            <strong>Website:</strong> {user.data.website}
          </Text>
          <Text>
            <strong>Company Name:</strong> {user.data.company.name}
          </Text>
          <Text>
            <strong>Company Catchphrase:</strong>{" "}
            {user.data.company.catchPhrase}
          </Text>
          <Text>
            <strong>Company BS:</strong> {user.data.company.bs}
          </Text>
          <Text>
            <strong>Latitude:</strong> {user.data.address.geo.lat}
          </Text>
          <Text>
            <strong>Longitude:</strong> {user.data.address.geo.lng}
          </Text>
        </Card>
      </Container>
    </>
    // <TableComponent
    // data={[
    //   {
    //     id: user.data.id,
    //     name: user.data.name,
    //     username: user.data.username,
    //     email: user.data.email,
    //     address: user.data.address,
    //     addressCombined: user.data.addressCombined,
    //   },
    // ]}
    // headers={config.table.page.headers}
    // columns={config.table.page.rows}
    // ></TableComponent>
  );
}
