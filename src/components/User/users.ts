import User from "../../Models/User";

const usersList: User[] = [
  {
    id: Math.floor(Math.random() * Date.now()),
    text: `I am user number 1`,
  },
  {
    id: Math.floor(Math.random() * Date.now()),
    text: `I am user number 2`,
  },
  {
    id: Math.floor(Math.random() * Date.now()),
    text: `I am user number 3`,
  },
];

export default usersList;