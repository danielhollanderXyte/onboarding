export const config = {
  url: "https://jsonplaceholder.typicode.com/posts",
  table: {
    main: {
      rows: [
        { columnName: "id", anchor: true },
        { columnName: "title", anchor: false },
        { columnName: "body", anchor: false },
      ],
      headers: ["Id", "Title", "Body"],
    },
    page: {
      rows: [
        { columnName: "id", anchor: false },
        { columnName: "title", anchor: false },
        { columnName: "body", anchor: false },
      ],
      headers: ["Id", "Title", "Body"],
    },
  },
};
