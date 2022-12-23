CREATE TABLE IF NOT EXISTS item (
    id VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT item_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS brand (
    id VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT brand_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS category (
    id VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT category_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS enterprise (
    id VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT enterprise_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS transaction (
    id VARCHAR(255) NOT NULL,
    enterprise VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT transaction_pk PRIMARY KEY (id),
    CONSTRAINT transaction_fk_enterprise FOREIGN KEY (enterprise) REFERENCES enterprise(id)
);

CREATE TABLE IF NOT EXISTS transaction_item (
    id VARCHAR(255) NOT NULL,
    transaction VARCHAR(255) NOT NULL,
    item VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unitOfMeasurement VARCHAR(5) NOT NULL,
    totalValue MONEY NOT NULL,
    CONSTRAINT transaction_item_pk PRIMARY KEY (id),
    CONSTRAINT transaction_item_fk_transaction FOREIGN KEY (transaction) REFERENCES transaction(id),
    CONSTRAINT transaction_item_fk_item FOREIGN KEY (item) REFERENCES item(id),
    CONSTRAINT transaction_item_fk_brand FOREIGN KEY (brand) REFERENCES brand(id),
    CONSTRAINT transaction_item_fk_category FOREIGN KEY (category) REFERENCES category(id)
);