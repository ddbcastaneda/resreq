export type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  job?: string;
};

export type TCreateUser = Omit<TUser, "id">;

export type TRegistrationInput = {
  firstName?: string;
  lastName?: string;
  job?: string;
};
