import { useUsers } from "../components/User/hooks/users.api.ts";
import { config } from "../components/User/user.config.ts";
import { TableComponent } from "../components/Table/Table.tsx";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
  const data = users.data.map((user) => ({
    ...user,
    addressCombined: `${user.address.street}, ${user.address.city}`,
  }));
  return (
    <TableComponent
      data={data}
      headers={config.table.main.headers}
      columns={config.table.main.rows}
    ></TableComponent>
  );
}
