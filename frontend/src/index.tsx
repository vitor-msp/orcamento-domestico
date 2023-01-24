import axios, { AxiosInstance } from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { IItemApi } from "./services/IItemApi";
import { ItemApi } from "./services/ItemApi";
import { ITransactionApi } from "./services/ITransactionApi";
import { ITransactionItemApi } from "./services/ITransactionItemApi";
import { TransactionApi } from "./services/TransactionApi";
import { TransactionItemApi } from "./services/TransactionItemApi";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const API_URI: string = process.env.REACT_APP_API_URI!;
if (!API_URI) alert("Erro ao se conectar ao sistema!");

const axiosApi: AxiosInstance = axios.create({ baseURL: API_URI });
export const enterpriseApi: IItemApi = new ItemApi(axiosApi, API_URI, `enterprises`);
export const itemApi: IItemApi = new ItemApi(axiosApi, API_URI,`items`);
export const brandApi: IItemApi = new ItemApi(axiosApi, API_URI,`brands`);
export const categoryApi: IItemApi = new ItemApi(axiosApi, API_URI,`categories`);
export const transactionApi: ITransactionApi = new TransactionApi(
  axiosApi,
  `${API_URI}/transactions`
);
export const transactionItemApi: ITransactionItemApi = new TransactionItemApi(
  axiosApi,
  `${API_URI}/transaction-items`
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
