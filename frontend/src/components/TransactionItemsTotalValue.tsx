import { TransactionItem } from "../domain/TransactionItem";

interface TransactionItemsTotalValueProps {
  items: TransactionItem[];
}

export const TransactionItemsTotalValue = (
  props: TransactionItemsTotalValueProps
) => {
  return (
    <div className="transaction-items-total-value">
      <span>Valor Total: </span>
      <span className="value">
        {props.items
          .reduce<number>((totalValue, currentItem: TransactionItem) => {
            const sum: number = +totalValue + +currentItem.totalValue!;
            return sum;
          }, 0)
          .toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
      </span>
    </div>
  );
};
