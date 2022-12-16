import { v4 as uuidv4 } from "uuid";

export class Item {
  private id: string;
  private description?: string;

  constructor(props: { id?: string; description?: string }) {
    this.id = props.id ?? uuidv4();
    if (props.description) this.description = props.description;
  }

  public setDescription(newDescription: string): void {
    this.description = newDescription;
  }

  public getDescription(): string {
    return this.description ?? "";
  }

  public getId(): string {
    return this.id;
  }
}
