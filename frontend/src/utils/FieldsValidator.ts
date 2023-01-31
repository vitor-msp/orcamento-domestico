export abstract class FieldsValidator {
  public static fieldsAreValid = (fields: any[]): boolean => {
    const inappropriateValues: any[] = [undefined, null, ""];
    for (const field of fields) {
      if (inappropriateValues.includes(field)) return false;
    }
    return true;
  };
}
