import axios, { AxiosResponse } from "axios";
import { Request } from "express";

export const postWithRetry = async (
  url: string,
  req: Request,
  retries = 3
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(url, req.body);
    return response;
  } catch (error: any) {
    if (retries <= 0) {
      throw error;
    }

    if (!error.response || error.response.status >= 500) {
      console.log(`Retrying request, attempts remaining: ${retries - 1}`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second before retrying
      return postWithRetry(url, req.body, retries - 1);
    }

    throw error;
  }
};

export const getWithRetry = async (
  url: string,
  retries = 3
): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error: any) {
    if (retries <= 0) {
      throw error;
    }

    if (!error.response || error.response.status >= 500) {
      console.log(`Retrying request, attempts remaining: ${retries - 1}`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second before retrying
      return getWithRetry(url, retries - 1);
    }

    throw error;
  }
};
