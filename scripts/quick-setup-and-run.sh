#!/bin/bash
# Quick setup with data loading and query execution

DB_NAME="index_monitoring_test"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Setting up database and loading data..."
psql -d $DB_NAME << 'EOFSQL'
-- Enable extension
CREATE EXTENSION IF NOT EXISTS pg_stat_insights;
SELECT pg_stat_insights_reset();

-- Create tables (if not exist)
CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(50),
    state VARCHAR(50),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    total_orders INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    category_id INT NOT NULL,
    brand VARCHAR(100),
    sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(customer_id),
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    total_amount DECIMAL(12,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(order_id),
    product_id INT NOT NULL REFERENCES products(product_id),
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_city ON customers(city);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone); -- Unused
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_weight ON products(weight_kg); -- Unused
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- Load data efficiently using COPY
\echo 'Loading customers...'
COPY customers (first_name, last_name, email, city, state, registration_date, status, total_orders)
FROM PROGRAM 'awk "BEGIN {for(i=1;i<=200000;i++) print \"FirstName\" i \"\t\" \"LastName\" (i%1000) \"\t\" \"customer\" i \"@example.com\" \"\t\" \"City\" (i%50) \"\t\" \"ST\" (i%10) \"\t\" \"2024-01-01\" \"\t\" \"active\" \"\t\" (i%100)}"' WITH (FORMAT csv, DELIMITER E'\t');

\echo 'Loading products...'
COPY products (product_name, category_id, brand, sku, price, stock_quantity, is_active)
FROM PROGRAM 'awk "BEGIN {for(i=1;i<=50000;i++) print \"Product \" i \"\t\" (i%20+1) \"\t\" \"Brand\" (i%50) \"\t\" \"SKU-\" i \"\t\" (i*10+50) \"\t\" (i%1000) \"\t\" \"true\"}"' WITH (FORMAT csv, DELIMITER E'\t');

\echo 'Loading orders...'
COPY orders (customer_id, order_date, status, total_amount, payment_status)
FROM PROGRAM 'awk "BEGIN {for(i=1;i<=500000;i++) print (i%200000+1) \"\t\" \"2024-01-01\" \"\t\" (i%10==0?\"cancelled\":\"completed\") \"\t\" (i*5+100) \"\t\" \"paid\"}"' WITH (FORMAT csv, DELIMITER E'\t');

\echo 'Loading order_items...'
COPY order_items (order_id, product_id, quantity, unit_price)
FROM PROGRAM 'awk "BEGIN {for(i=1;i<=1000000;i++) print (i%500000+1) \"\t\" (i%50000+1) \"\t\" (i%5+1) \"\t\" (i*2+10)}"' WITH (FORMAT csv, DELIMITER E'\t');

-- Run queries to generate statistics
SELECT * FROM customers WHERE email = 'customer1000@example.com';
SELECT * FROM customers WHERE city = 'City10' LIMIT 100;
SELECT * FROM products WHERE category_id = 5 LIMIT 100;
SELECT * FROM orders WHERE customer_id = 1000 LIMIT 100;
SELECT * FROM orders WHERE status = 'completed' LIMIT 1000;

-- Create bloat
UPDATE customers SET status = 'inactive' WHERE customer_id % 1000 = 0;
UPDATE products SET price = price * 1.1 WHERE category_id % 5 = 0;
DELETE FROM orders WHERE status = 'cancelled' LIMIT 1000;

ANALYZE;
EOFSQL

echo "Running index monitoring queries..."
psql -d $DB_NAME -f "$SCRIPT_DIR/run-all-index-queries.sql" > /tmp/index-monitoring-results.txt 2>&1

echo "Results saved to /tmp/index-monitoring-results.txt"
cat /tmp/index-monitoring-results.txt

