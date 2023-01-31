import { Transaction, TransactionApiType } from "../domain/Transaction";
import { FindDescription } from "./FindDescription";

export abstract class TransactionUtils {
  public static prepareData(
    transaction: Transaction,
    newData: TransactionApiType
  ): Transaction {
    transaction.id = newData.id;
    transaction.date = newData.date.substring(0, 10);
    transaction.enterprise = newData.enterprise;
    transaction.transactionItems = newData.items.map((item) => {
      return {
        id: item.id,
        transaction: item.transaction,
        quantity: item.quantity,
        unitOfMeasurement: item.unitofmeasurement,
        totalValue: +item
          .totalvalue!.substring(3)
          .replaceAll(".", "")
          .replaceAll(",", "."),
        item: {
          id: item.item!,
          description: FindDescription.of("item", item.item!),
        },
        brand: {
          id: item.brand!,
          description: FindDescription.of("brand", item.brand!),
        },
        category: {
          id: item.category!,
          description: FindDescription.of("category", item.category!),
        },
      };
    });
    return transaction;
  }
}
