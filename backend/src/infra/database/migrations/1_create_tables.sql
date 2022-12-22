CREATE TABLE IF NOT EXISTS items (
    pk SERIAL,
    id VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT items_pk PRIMARY KEY (pk),
    CONSTRAINT items_id UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS brands (
    pk SERIAL,
    id VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT brands_pk PRIMARY KEY (pk),
    CONSTRAINT brands_id UNIQUE (id)
);