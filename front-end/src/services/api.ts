import axios from "axios";
import { TRegistrationInput } from "../types/user";

const api = "http://127.0.0.1:3000/api/v1/users";

export const getUsers = async () => {
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (id: number) => {
  try {
    const response = await axios.get(`${api}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postUser = async (user: TRegistrationInput) => {
  try {
    const response = await axios.post(api, user);
    return response;
  } catch (error) {
    console.error(error);
  }
};
