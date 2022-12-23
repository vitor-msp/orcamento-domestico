export abstract class FormatDateToPG {
  public static format(input: Date): string {
    const year = input.getFullYear();
    const month = input.getMonth();
    const day = input.getDate();
    return `${year}-${month}-${day}`;
  }
}
