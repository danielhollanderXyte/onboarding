export const config = {
  url: "https://jsonplaceholder.typicode.com/users",
  table: {
    main: {
      rows: [
        { columnName: "name", anchor: true },
        { columnName: "username", anchor: false },
        { columnName: "email", anchor: false },
        { columnName: "addressCombined", anchor: false },
      ],
      headers: ["Name", "Username", "Email", "Street"],
    },
    page: {
      rows: [
        { columnName: "name", anchor: false },
        { columnName: "username", anchor: false },
        { columnName: "email", anchor: false },
        { columnName: "addressCombined", anchor: false },
      ],
      headers: ["Name", "Username", "Email", "Street"],
    },
  },
};
