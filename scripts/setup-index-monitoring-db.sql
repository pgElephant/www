-- Setup database for index monitoring demonstration
-- Creates ~2GB of data with multiple indexes, bloat scenarios, and complex queries

\c index_monitoring_test

-- Enable pg_stat_insights
CREATE EXTENSION IF NOT EXISTS pg_stat_insights;

-- Reset statistics
SELECT pg_stat_insights_reset();

-- Create tables with realistic schemas
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address_line1 VARCHAR(100),
    address_line2 VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(50),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    credit_limit DECIMAL(10,2),
    total_orders INT DEFAULT 0,
    lifetime_value DECIMAL(12,2) DEFAULT 0
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    category_id INT NOT NULL,
    subcategory_id INT,
    brand VARCHAR(100),
    sku VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    cost DECIMAL(10,2),
    stock_quantity INT DEFAULT 0,
    reorder_level INT DEFAULT 10,
    weight_kg DECIMAL(8,3),
    dimensions VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(customer_id),
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ship_date TIMESTAMP,
    delivery_date TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    total_amount DECIMAL(12,2) NOT NULL,
    shipping_cost DECIMAL(8,2) DEFAULT 0,
    tax_amount DECIMAL(8,2) DEFAULT 0,
    discount_amount DECIMAL(8,2) DEFAULT 0,
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'pending',
    shipping_address TEXT,
    notes TEXT
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(order_id),
    product_id INT NOT NULL REFERENCES products(product_id),
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(5,2) DEFAULT 0,
    line_total DECIMAL(12,2) NOT NULL
);

CREATE TABLE inventory_transactions (
    transaction_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(product_id),
    transaction_type VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    reference_id INT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(product_id),
    customer_id INT NOT NULL REFERENCES customers(customer_id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    helpful_count INT DEFAULT 0,
    verified_purchase BOOLEAN DEFAULT false
);

-- Create indexes (some will be used, some won't, some will bloat)

-- Customers table indexes
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_last_name ON customers(last_name);
CREATE INDEX idx_customers_city ON customers(city);
CREATE INDEX idx_customers_state ON customers(state);
CREATE INDEX idx_customers_postal_code ON customers(postal_code);
CREATE INDEX idx_customers_registration_date ON customers(registration_date);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_last_login ON customers(last_login);
-- Unused index (will never be queried)
CREATE INDEX idx_customers_phone ON customers(phone);

-- Products table indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_subcategory ON products(subcategory_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_stock ON products(stock_quantity);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_created ON products(created_at);
-- Unused index
CREATE INDEX idx_products_weight ON products(weight_kg);

-- Orders table indexes
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_total ON orders(total_amount);
CREATE INDEX idx_orders_ship_date ON orders(ship_date);

-- Order items indexes
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_order_items_quantity ON order_items(quantity);

-- Inventory indexes
CREATE INDEX idx_inventory_product ON inventory_transactions(product_id);
CREATE INDEX idx_inventory_type ON inventory_transactions(transaction_type);
CREATE INDEX idx_inventory_date ON inventory_transactions(transaction_date);

-- Reviews indexes
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_customer ON reviews(customer_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_date ON reviews(review_date);

-- Composite indexes
CREATE INDEX idx_customers_name_city ON customers(last_name, city);
CREATE INDEX idx_products_category_brand ON products(category_id, brand);
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);
CREATE INDEX idx_order_items_order_product ON order_items(order_id, product_id);

-- Partial indexes
CREATE INDEX idx_products_low_stock ON products(product_id) WHERE stock_quantity < reorder_level;
CREATE INDEX idx_orders_active ON orders(order_id) WHERE status IN ('pending', 'processing');
CREATE INDEX idx_customers_active ON customers(customer_id) WHERE status = 'active';

-- Insert large amounts of data (approximately 2GB)
-- This will take some time

-- Insert 500,000 customers
INSERT INTO customers (first_name, last_name, email, phone, city, state, postal_code, country, registration_date, last_login, status, credit_limit, total_orders, lifetime_value)
SELECT 
    'FirstName' || i,
    'LastName' || (i % 1000),
    'customer' || i || '@example.com',
    '555-' || LPAD((i % 10000)::text, 4, '0'),
    CASE (i % 50) WHEN 0 THEN 'New York' WHEN 1 THEN 'Los Angeles' WHEN 2 THEN 'Chicago' WHEN 3 THEN 'Houston' WHEN 4 THEN 'Phoenix' ELSE 'City' || (i % 50) END,
    CASE (i % 10) WHEN 0 THEN 'CA' WHEN 1 THEN 'NY' WHEN 2 THEN 'TX' WHEN 3 THEN 'FL' WHEN 4 THEN 'IL' ELSE 'ST' || (i % 10) END,
    LPAD((10000 + (i % 90000))::text, 5, '0'),
    'USA',
    CURRENT_TIMESTAMP - (RANDOM() * 3650 || ' days')::interval,
    CURRENT_TIMESTAMP - (RANDOM() * 30 || ' days')::interval,
    CASE WHEN i % 100 = 0 THEN 'inactive' ELSE 'active' END,
    (RANDOM() * 10000 + 500)::decimal(10,2),
    (RANDOM() * 100)::int,
    (RANDOM() * 50000 + 100)::decimal(12,2)
FROM generate_series(1, 500000) i;

-- Insert 100,000 products
INSERT INTO products (product_name, category_id, subcategory_id, brand, sku, description, price, cost, stock_quantity, reorder_level, weight_kg, dimensions, created_at, updated_at, is_active)
SELECT 
    'Product ' || i || ' - Category ' || (i % 20),
    (i % 20) + 1,
    (i % 100) + 1,
    CASE (i % 50) WHEN 0 THEN 'BrandA' WHEN 1 THEN 'BrandB' WHEN 2 THEN 'BrandC' WHEN 3 THEN 'BrandD' ELSE 'Brand' || (i % 50) END,
    'SKU-' || LPAD(i::text, 8, '0'),
    'Description for product ' || i || ' with detailed information about features and specifications.',
    (RANDOM() * 500 + 10)::decimal(10,2),
    (RANDOM() * 300 + 5)::decimal(10,2),
    (RANDOM() * 1000)::int,
    10 + (RANDOM() * 50)::int,
    (RANDOM() * 10 + 0.1)::decimal(8,3),
    (RANDOM() * 50 + 10)::text || 'x' || (RANDOM() * 30 + 5)::text || 'x' || (RANDOM() * 20 + 2)::text,
    CURRENT_TIMESTAMP - (RANDOM() * 730 || ' days')::interval,
    CURRENT_TIMESTAMP - (RANDOM() * 30 || ' days')::interval,
    CASE WHEN i % 200 = 0 THEN false ELSE true END
FROM generate_series(1, 100000) i;

-- Insert 2,000,000 orders
INSERT INTO orders (customer_id, order_date, ship_date, delivery_date, status, total_amount, shipping_cost, tax_amount, discount_amount, payment_method, payment_status, shipping_address, notes)
SELECT 
    (RANDOM() * 500000 + 1)::int,
    CURRENT_TIMESTAMP - (RANDOM() * 1095 || ' days')::interval,
    CASE WHEN RANDOM() > 0.3 THEN CURRENT_TIMESTAMP - (RANDOM() * 1090 || ' days')::interval ELSE NULL END,
    CASE WHEN RANDOM() > 0.5 THEN CURRENT_TIMESTAMP - (RANDOM() * 1085 || ' days')::interval ELSE NULL END,
    CASE (i % 10) WHEN 0 THEN 'pending' WHEN 1 THEN 'processing' WHEN 2 THEN 'shipped' WHEN 3 THEN 'delivered' WHEN 4 THEN 'cancelled' ELSE 'completed' END,
    (RANDOM() * 1000 + 20)::decimal(12,2),
    (RANDOM() * 50 + 5)::decimal(8,2),
    (RANDOM() * 100 + 5)::decimal(8,2),
    CASE WHEN RANDOM() > 0.7 THEN (RANDOM() * 50)::decimal(8,2) ELSE 0 END,
    CASE (i % 5) WHEN 0 THEN 'credit_card' WHEN 1 THEN 'paypal' WHEN 2 THEN 'debit_card' WHEN 3 THEN 'bank_transfer' ELSE 'cash' END,
    CASE WHEN RANDOM() > 0.2 THEN 'paid' ELSE 'pending' END,
    'Address ' || (RANDOM() * 1000 + 1)::int || ' Street, City, State ' || LPAD((10000 + (RANDOM() * 90000))::text, 5, '0'),
    CASE WHEN RANDOM() > 0.8 THEN 'Special instructions for order ' || i ELSE NULL END
FROM generate_series(1, 2000000) i;

-- Insert 5,000,000 order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, discount, line_total)
SELECT 
    (RANDOM() * 2000000 + 1)::int,
    (RANDOM() * 100000 + 1)::int,
    (RANDOM() * 5 + 1)::int,
    (RANDOM() * 500 + 10)::decimal(10,2),
    CASE WHEN RANDOM() > 0.8 THEN (RANDOM() * 20)::decimal(5,2) ELSE 0 END,
    ((RANDOM() * 5 + 1) * (RANDOM() * 500 + 10) * (1 - CASE WHEN RANDOM() > 0.8 THEN (RANDOM() * 0.2) ELSE 0 END))::decimal(12,2)
FROM generate_series(1, 5000000) i;

-- Insert 1,000,000 inventory transactions
INSERT INTO inventory_transactions (product_id, transaction_type, quantity, reference_id, transaction_date, notes)
SELECT 
    (RANDOM() * 100000 + 1)::int,
    CASE (i % 4) WHEN 0 THEN 'sale' WHEN 1 THEN 'purchase' WHEN 2 THEN 'return' ELSE 'adjustment' END,
    CASE WHEN (i % 4) IN (0, 2) THEN -(RANDOM() * 10 + 1)::int ELSE (RANDOM() * 100 + 1)::int END,
    CASE WHEN (i % 4) = 0 THEN (RANDOM() * 2000000 + 1)::int ELSE NULL END,
    CURRENT_TIMESTAMP - (RANDOM() * 365 || ' days')::interval,
    CASE WHEN RANDOM() > 0.7 THEN 'Transaction note ' || i ELSE NULL END
FROM generate_series(1, 1000000) i;

-- Insert 500,000 reviews
INSERT INTO reviews (product_id, customer_id, rating, review_text, review_date, helpful_count, verified_purchase)
SELECT 
    (RANDOM() * 100000 + 1)::int,
    (RANDOM() * 500000 + 1)::int,
    (RANDOM() * 5 + 1)::int,
    CASE WHEN RANDOM() > 0.3 THEN 'Review text for product ' || (RANDOM() * 100000 + 1)::int || ' with detailed feedback and comments.' ELSE NULL END,
    CURRENT_TIMESTAMP - (RANDOM() * 730 || ' days')::interval,
    (RANDOM() * 100)::int,
    CASE WHEN RANDOM() > 0.5 THEN true ELSE false END
FROM generate_series(1, 500000) i;

-- Update statistics
ANALYZE;

-- Run queries to generate index usage statistics
-- These queries will use various indexes

-- Query 1: Customer lookups by email (uses idx_customers_email)
SELECT * FROM customers WHERE email = 'customer12345@example.com';
SELECT * FROM customers WHERE email IN ('customer100@example.com', 'customer200@example.com', 'customer300@example.com');

-- Query 2: Customer searches by name and city (uses idx_customers_name_city)
SELECT * FROM customers WHERE last_name = 'LastName500' AND city = 'New York' LIMIT 100;

-- Query 3: Product searches by category and brand (uses idx_products_category_brand)
SELECT * FROM products WHERE category_id = 5 AND brand = 'BrandA' LIMIT 100;

-- Query 4: Order queries by customer and date (uses idx_orders_customer_date)
SELECT * FROM orders WHERE customer_id = 12345 AND order_date > CURRENT_DATE - INTERVAL '30 days';

-- Query 5: Product price range queries (uses idx_products_price)
SELECT * FROM products WHERE price BETWEEN 100 AND 200 LIMIT 1000;

-- Query 6: Low stock products (uses idx_products_low_stock partial index)
SELECT * FROM products WHERE stock_quantity < reorder_level LIMIT 500;

-- Query 7: Active orders (uses idx_orders_active partial index)
SELECT * FROM orders WHERE status IN ('pending', 'processing') LIMIT 1000;

-- Query 8: Reviews by product and rating (uses idx_reviews_product and idx_reviews_rating)
SELECT * FROM reviews WHERE product_id = 5000 AND rating >= 4 LIMIT 100;

-- Query 9: Inventory transactions by type and date (uses idx_inventory_type and idx_inventory_date)
SELECT * FROM inventory_transactions WHERE transaction_type = 'sale' AND transaction_date > CURRENT_DATE - INTERVAL '7 days' LIMIT 1000;

-- Query 10: Customer orders with totals (uses multiple indexes)
SELECT c.customer_id, c.first_name, c.last_name, COUNT(o.order_id) as order_count, SUM(o.total_amount) as total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE c.status = 'active' AND o.order_date > CURRENT_DATE - INTERVAL '90 days'
GROUP BY c.customer_id, c.first_name, c.last_name
HAVING COUNT(o.order_id) > 5
ORDER BY total_spent DESC
LIMIT 100;

-- Query 11: Product sales analysis (uses idx_order_items_product)
SELECT p.product_id, p.product_name, COUNT(oi.order_item_id) as times_ordered, SUM(oi.quantity) as total_quantity
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
WHERE p.is_active = true
GROUP BY p.product_id, p.product_name
ORDER BY total_quantity DESC
LIMIT 100;

-- Query 12: Sequential scans (will show missing indexes)
SELECT * FROM customers WHERE postal_code LIKE '1%' AND state = 'CA';
SELECT * FROM orders WHERE total_amount > 500 AND payment_status = 'pending';

-- Create bloat scenarios by updating and deleting data
-- This will cause index bloat

-- Update many customer records (causes bloat in customer indexes)
UPDATE customers SET last_login = CURRENT_TIMESTAMP WHERE customer_id % 100 = 0;
UPDATE customers SET status = 'inactive', last_login = CURRENT_TIMESTAMP WHERE customer_id % 1000 = 0;

-- Update product prices (causes bloat in product indexes)
UPDATE products SET price = price * 1.1 WHERE category_id % 5 = 0;
UPDATE products SET stock_quantity = stock_quantity - 10 WHERE product_id % 10 = 0;

-- Delete some orders (causes bloat in order indexes)
DELETE FROM order_items WHERE order_id IN (SELECT order_id FROM orders WHERE status = 'cancelled' LIMIT 10000);
DELETE FROM orders WHERE status = 'cancelled' AND order_date < CURRENT_DATE - INTERVAL '365 days' LIMIT 5000;

-- Update order statuses (causes bloat)
UPDATE orders SET status = 'completed', delivery_date = CURRENT_TIMESTAMP WHERE status = 'shipped' AND ship_date < CURRENT_DATE - INTERVAL '30 days' LIMIT 50000;

-- Vacuum to show maintenance needs
VACUUM ANALYZE customers;
VACUUM ANALYZE products;
VACUUM ANALYZE orders;

-- Run more queries to generate additional statistics
SELECT COUNT(*) FROM customers WHERE city = 'New York';
SELECT COUNT(*) FROM products WHERE brand = 'BrandA';
SELECT COUNT(*) FROM orders WHERE status = 'completed';
SELECT AVG(rating) FROM reviews WHERE product_id = 1000;

-- Final analyze to update all statistics
ANALYZE;

