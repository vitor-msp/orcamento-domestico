export abstract class FieldsValidator {
  public static fieldsAreValid = (fields: any[]): boolean => {
    const inappropriateValues: any[] = [undefined, null, ""];
    fields.forEach((field) => {
      if (inappropriateValues.includes(field)) return false;
    });
    return true;
  };
}
