export abstract class FormatDateToPG {
  public static format(input: Date): string {
    const dateWithoutTime = input.toISOString().slice(0, 10);
    return dateWithoutTime;
  }
}
