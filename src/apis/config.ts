import { useState } from "react";
import APIS from "./index";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const baseURL = axios.create({ baseURL: `${url}/api` });

type mutate = (body?: any, params?: any) => Promise<any>;

type use_api = (query: any) => [mutate, boolean];

const useAPI: use_api = (query) => {
  const [loading, toggleLoading] = useState(false);

  const mutate = async (body: any, params: any) => {
    try {
      toggleLoading(true);
      const res = await query(body, params);

      if (res.data.success === false) {
        throw res.data?.message || "Something went wrong";
      }

      return res;
    } catch (err: any) {
      throw err;
    } finally {
      toggleLoading(false);
    }
  };

  return [mutate, loading];
};

const errorHandler = (error: any): string => {
  if (typeof error == "string") {
    return error;
  } else if (error.response) {
    return typeof error.response.data === "string"
      ? error.response.data
      : error.response.data.message;
  } else if (error.message) {
    return `${error.message}`;
  } else {
    return "Something went wrong";
  }
};

export { useAPI, APIS, errorHandler };
