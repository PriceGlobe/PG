const db = require('./index');

const seed = () => {
    // Clear existing data
    db.prepare('DELETE FROM price_listings').run();
    db.prepare('DELETE FROM products').run();
    db.prepare('DELETE FROM stores').run();

    // Insert stores
    const insertStore = db.prepare('INSERT INTO stores (name, country, city, rating, base_currency) VALUES (?, ?, ?, ?, ?)');
    const decathlon = insertStore.run('Decathlon', 'France', 'Paris', 4.5, 'EUR').lastInsertRowid;
    const amazon = insertStore.run('Amazon', 'USA', 'Seattle', 4.7, 'USD').lastInsertRowid;
    const aldi = insertStore.run('Aldi', 'Germany', 'Essen', 4.3, 'EUR').lastInsertRowid;
    const shell = insertStore.run('Shell', 'Netherlands', 'The Hague', 4.1, 'EUR').lastInsertRowid;

    // Insert products
    const insertProduct = db.prepare('INSERT INTO products (name, category, image_url) VALUES (?, ?, ?)');
    const kettlebell = insertProduct.run('16kg Kettlebell', 'sports', 'https://example.com/kettlebell.jpg').lastInsertRowid;
    const milk = insertProduct.run('Organic Milk 1L', 'groceries', 'https://example.com/milk.jpg').lastInsertRowid;
    const gas = insertProduct.run('Premium Unleaded', 'gas', 'https://example.com/gas.jpg').lastInsertRowid;

    // Insert price listings
    const insertPrice = db.prepare('INSERT INTO price_listings (product_id, store_id, price, currency, url) VALUES (?, ?, ?, ?, ?)');
    
    // Kettlebell prices
    insertPrice.run(kettlebell, decathlon, 45.00, 'EUR', 'https://decathlon.fr/p/kettlebell-16kg');
    insertPrice.run(kettlebell, amazon, 55.00, 'USD', 'https://amazon.com/p/kettlebell-16kg');

    // Milk prices
    insertPrice.run(milk, aldi, 1.20, 'EUR', 'https://aldi.de/p/milk');
    insertPrice.run(milk, decathlon, 1.50, 'EUR', 'https://decathlon.fr/p/milk'); // Maybe they sell protein milk?

    // Gas prices
    insertPrice.run(gas, shell, 1.95, 'EUR', 'https://shell.nl/gas');

    console.log('Database seeded successfully!');
};

seed();
