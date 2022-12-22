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