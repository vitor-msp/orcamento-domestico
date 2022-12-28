import { TransactionItem} from "./TransactionItem";

export const TransactionItemsList = () => {
  return (
    <div style={{ border: "1px solid red" }}>
      <p>Transaction Items List</p>
      <TransactionItem/>
      <TransactionItem/>
      <TransactionItem/>
    </div>
  );
};
