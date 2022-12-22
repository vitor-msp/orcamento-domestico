import { Client } from "pg";
import dotenv from "dotenv";
import { migrate } from "postgres-migrations";

type environmentVars = {
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
};

export abstract class DB {
  private static getEnvironmentVars(): environmentVars {
    dotenv.config();

    const environmentVars = [
      process.env.DB_HOST,
      process.env.DB_PORT,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      process.env.DB_NAME,
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
      DB_NAME: process.env.DB_NAME!,
    };
  }

  private static async runMigrations(client: Client): Promise<void> {
    try {
      await migrate({ client }, "src/infra/database/migrations/");
      console.log(`Migrations executed in database.`)
    } catch (error) {
      throw new Error(`Error to execute migrations in database - ${error}`);
    }
  }

  public static async connect(): Promise<Client> {
    const environmentVars = this.getEnvironmentVars();
    const client = new Client({
      host: environmentVars.DB_HOST,
      port: environmentVars.DB_PORT,
      user: environmentVars.DB_USER,
      password: environmentVars.DB_PASSWORD,
      database: environmentVars.DB_NAME,
    });
    try {
      await client.connect();
      console.log(`PG connected.`);
    } catch (error) {
      throw new Error(`Error in PG connection - ${error}`);
    }
    this.runMigrations(client);
    return client;
  }
}
