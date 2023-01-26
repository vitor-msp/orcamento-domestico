import axios, { AxiosInstance } from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { IItemApi } from "./services/api/IItemApi";
import { ItemApi } from "./services/api/ItemApi";
import { ITransactionApi } from "./services/api/ITransactionApi";
import { ITransactionItemApi } from "./services/api/ITransactionItemApi";
import { TransactionApi } from "./services/api/TransactionApi";
import { TransactionItemApi } from "./services/api/TransactionItemApi";
import { Repository } from "./services/data/Repository";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const API_URI: string = process.env.REACT_APP_API_URI!;
if (!API_URI) alert("Erro ao se conectar ao sistema!");

const axiosApi: AxiosInstance = axios.create({ baseURL: API_URI });
export const enterpriseApi: IItemApi = new ItemApi(
  axiosApi,
  API_URI,
  `enterprises`
);
export const itemApi: IItemApi = new ItemApi(axiosApi, API_URI, `items`);
export const brandApi: IItemApi = new ItemApi(axiosApi, API_URI, `brands`);
export const categoryApi: IItemApi = new ItemApi(
  axiosApi,
  API_URI,
  `categories`
);
export const transactionApi: ITransactionApi = new TransactionApi(
  axiosApi,
  `${API_URI}/transactions`
);
export const transactionItemApi: ITransactionItemApi = new TransactionItemApi(
  axiosApi,
  `${API_URI}/transaction-items`
);

export let repository: Repository = new Repository(
  itemApi,
  brandApi,
  categoryApi
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
