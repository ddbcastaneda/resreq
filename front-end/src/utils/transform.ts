import { TRegistrationInput, TUser } from "../types/user";

// API properties do not match required properties by project
// Creating this function to transform the input to the required format
export const transformInputToUser = (
  input: TRegistrationInput,
  users: TUser[]
): TUser => {
  const newUser: TUser = {
    id: getMaxId(users) + 1,
    email: `${input.firstName}.${input.lastName}@resreq.in`,
    first_name: `${input.firstName}`,
    last_name: `${input.lastName}`,
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    job: input.job,
  };
  return newUser;
};

const getMaxId = (users: TUser[]): number => {
  return Math.max(...users.map((user) => user.id));
};
