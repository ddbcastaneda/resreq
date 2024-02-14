import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";
import NodeCache from "node-cache";
import { getWithRetry, postWithRetry } from "./axiosController";

type TUserData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

type TRegistrationInput = {
  firstName: string;
  lastName: string;
  job: string;
};

const cache = new NodeCache({ stdTTL: 120 });
const apiUrl = process.env.REQRES_API_URL || "https://reqres.in/api/users";

// GET ALL USERS
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  const per_page: number = Number(req.query.per_page) || 6;
  const cacheKey: string = `users_${page}`;

  const cachedData: TUserData[] | undefined = cache.get(cacheKey);
  if (cachedData) {
    return res.status(200).json({ status: "success", data: cachedData });
  }

  const response = await getWithRetry(
    `${apiUrl}?page=${page}&per_page=${per_page}`
  );
  const users: TUserData[] = response.data.data;

  cache.set(cacheKey, users, 120);

  res.status(200).json({ status: "success", data: users });
});

// GET USER
const getUser = catchAsync(async (req: Request, res: Response) => {
  const userId: number = Number(req.params.id);
  const cacheKey: string = `user_${userId}`;

  const cachedData: TUserData | undefined = cache.get(cacheKey);
  if (cachedData) {
    return res.status(200).json({ status: "success", data: cachedData });
  }

  const response = await getWithRetry(`${apiUrl}/${userId}`);
  const userData: TUserData = response.data.data;

  cache.set(cacheKey, userData, 300);

  res.status(200).json({ status: "success", data: userData });
});

// CREATE USER
const createUser = catchAsync(async (req: Request, res: Response) => {
  const {
    firstName: first_name,
    lastName: last_name,
    job,
  }: TRegistrationInput = req.body;
  if (!first_name || !last_name || !job) {
    throw new AppError(
      "First name, last name, and job are required fields",
      400
    );
  }

  const response = await postWithRetry(apiUrl, req.body);
  const newUser: TUserData = response.data;

  cache.flushAll();

  res.status(201).json({ status: "success", data: newUser });
});

export { getAllUsers, getUser, createUser };
