import { v4 as uuidv4 } from "uuid";
import { Enterprise } from "./Enterprise";

export class Transaction {
  private id: string;
  private enterprise?: Enterprise;
  private date?: Date;

  constructor(props: { id?: string; enterprise?: Enterprise; date?: Date }) {
    this.id = props.id ?? uuidv4();
    if (props.enterprise) this.enterprise = props.enterprise;
    if (props.date) this.date = props.date;
  }

  public setEnterprise(newEnterprise: Enterprise): void {
    this.enterprise = newEnterprise;
  }

  public setDate(newDate: Date): void {
    this.date = newDate;
  }

  public getEnterprise(): Enterprise | null {
    return this.enterprise ?? null;
  }

  public getDate(): Date | null {
    return this.date ?? null;
  }

  public getId(): string {
    return this.id;
  }
}
