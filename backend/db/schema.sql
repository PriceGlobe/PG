CREATE TABLE IF NOT EXISTS stores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT,
    rating REAL DEFAULT 0,
    base_currency TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- sports, gas, groceries
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS price_listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    store_id INTEGER,
    price REAL NOT NULL,
    currency TEXT NOT NULL,
    url TEXT,
    scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS exchange_rates (
    from_currency TEXT,
    to_currency TEXT,
    rate REAL NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (from_currency, to_currency)
);
