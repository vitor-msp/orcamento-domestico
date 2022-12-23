CREATE UNIQUE INDEX IF NOT EXISTS transaction_idx ON transaction (enterprise, date);

CREATE INDEX IF NOT EXISTS transaction_item_idx ON transaction_item (transaction);