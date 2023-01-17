import { ITransactionApi } from "../services/ITransactionApi";

interface AddTransactionItemAreaProps {
  api: ITransactionApi;
}

export const AddTransactionItemArea = ({
  api,
}: AddTransactionItemAreaProps) => {
  return (
    <div style={{ border: "1px solid red" }}>
      <p>Add Transaction Item Area</p>
    </div>
  );
};
