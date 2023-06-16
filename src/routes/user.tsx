import { useUser } from "../components/User/hooks/users.api.ts";
import { type ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Card, Text, Group, Container, Space } from "@mantine/core";

export function User(): ReactElement | ReactElement[] | null {
  const params = useParams();
  const userId = params.userId as string;
  const user = useUser(userId);

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.isError) {
    return <div>Error: Oh no!</div>;
  }
  if (user.data === null || user.data === undefined) return null;

  const data = user.data;
  return (
    <>
      <Space h="xs" />
      <Container size="35rem">
        <Card shadow="md" radius="md" withBorder>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={700}>{data.name}</Text>
          </Group>
          <Text>
            <strong>Username:</strong> {data.username}
          </Text>
          <Text>
            <strong>Email:</strong> {data.email}
          </Text>
          <Text>
            <strong>Address:</strong> {data.address.street},{" "}
            {data.address.suite}, {data.address.city}, {data.address.zipcode}
          </Text>
          <Text>
            <strong>Phone:</strong> {data.phone}
          </Text>
          <Text>
            <strong>Website:</strong> {data.website}
          </Text>
          <Text>
            <strong>Company Name:</strong> {data.company.name}
          </Text>
          <Text>
            <strong>Company. Catchphrase:</strong> {data.company.catchPhrase}
          </Text>
          <Text>
            <strong>Company. BS:</strong> {data.company.bs}
          </Text>
          <Text>
            <strong>Latitude:</strong> {data.address.geo.lat}
          </Text>
          <Text>
            <strong>Longitude:</strong> {data.address.geo.lng}
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
