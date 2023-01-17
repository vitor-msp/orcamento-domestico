export abstract class FormUtils {
  public static blockSubmit(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
