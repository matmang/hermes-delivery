import axios from "axios";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { AllStores } from "./dtos/all-stores";
import { CreateAccountInput } from "./dtos/create-account.interface";
import { CreateOrderInput } from "./dtos/create-order.dto";
import { Login } from "./dtos/login.interface";

const callApi = async (
  method: string,
  path: string,
  data?: any,
  jwt?: string | null
) => {
  const headers = {
    "x-jwt": jwt,
    "Content-Type": "application/json",
  };
  const baseUrl =
    "http://ec2-13-209-7-136.ap-northeast-2.compute.amazonaws.com:4000/api/v1";
  const fullUrl = `${baseUrl}${path}`;
  if (method === "get") {
    return axios.get(fullUrl, {
      headers,
    });
  } else if (method === "delete") {
    return axios.delete(fullUrl, {
      headers,
    });
  } else if (method === "post") {
    return axios.post(fullUrl, data, {
      headers,
    });
  } else if (method === "patch") {
    return axios.patch(fullUrl, data, {
      headers,
    });
  } else {
    console.error("method error");
  }
};

export const createAccount = (form: CreateAccountInput) =>
  callApi("post", "/user/create-account", form);

export const login = (form: Login) => callApi("post", "/user/login", form);

export const allStores = (form: AllStores) =>
  callApi("get", `/store/all?page=${form.page}`);

export const readOneStore = (form: number) => callApi("get", `/store/${form}`);

export const createOrder = (form: CreateOrderInput) =>
  callApi("post", "/order", form, localStorage.getItem(LOCALSTORAGE_TOKEN));

export const me = () =>
  callApi("get", "/user/me", "", localStorage.getItem(LOCALSTORAGE_TOKEN));

export const readOneOrder = (form: number) =>
  callApi(
    "get",
    `/order/${form}`,
    "",
    localStorage.getItem(LOCALSTORAGE_TOKEN)
  );
