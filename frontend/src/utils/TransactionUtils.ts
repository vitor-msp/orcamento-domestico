import { Transaction, TransactionApiType } from "../domain/Transaction";

export abstract class TransactionUtils {
  public static getPropertiesDescriptions(
    transaction: Transaction,
    newData: TransactionApiType
  ): Transaction {
    transaction.id = newData.id;
    transaction.date = newData.date;
    transaction.enterprise = newData.enterprise;
    transaction.transactionItems = newData.items.map((item) => {
      return {
        id: item.id,
        transaction: item.transaction,
        quantity: item.quantity,
        unitOfMeasurement: item.unitofmeasurement,
        totalValue: item.totalvalue,
        item: { id: item.item!, description: "" },
        brand: { id: item.brand!, description: "" },
        category: { id: item.category!, description: "" },
      };
    });
    return transaction;
  }
}
