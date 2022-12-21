import { Client } from "pg";

type environmentVars = {
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
};

export abstract class DB {
  private static getEnvironmentVars(): environmentVars {
    const environmentVars = [
      process.env.DB_HOST,
      process.env.DB_PORT,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
    ];

    if (environmentVars.includes(undefined) || environmentVars.includes(""))
      throw new Error("Missing environment vars.");

    if (isNaN(+process.env.DB_PORT!))
      throw new Error("DB port must be a number.");

    return {
      DB_HOST: process.env.DB_HOST!,
      DB_PORT: +process.env.DB_PORT!,
      DB_USER: process.env.DB_USER!,
      DB_PASSWORD: process.env.DB_PASSWORD!,
    };
  }

  public static connect(): Client {
    let dbIsConnected = false;
    const environmentVars = DB.getEnvironmentVars();

    const client = new Client({
      host: environmentVars.DB_HOST,
      port: environmentVars.DB_PORT,
      user: environmentVars.DB_USER,
      password: environmentVars.DB_PASSWORD,
    });

    client
      .connect()
      .then(() => {
        console.log(`PG connected.`);
        dbIsConnected = true;
      })
      .catch(() => {
        console.log(`Error in PG connection.`);
        dbIsConnected = false;
      });

    if (!dbIsConnected) throw new Error("Database is not connected.");

    return client;
  }
}
