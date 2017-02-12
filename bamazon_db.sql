CREATE DATABASE IF NOT EXISTS bamazon_db;
USE bamazon_db;

CREATE TABLE products (
  Item_ID INTEGER (50)UNSIGNED AUTO_INCREMENT NOT NULL,
  Product_Name VARCHAR(45) DEFAULT NULL,
  Department_Name VARCHAR(45)DEFAULT NULL,
  Price DECIMAL(10,2) NOT NULL,
  Stock_Quantity int(11)DEFAULT NULL,
  Product_Sales int(11) DEFAULT 0,
  PRIMARY KEY (Item_ID)
  );

-- Add product--
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('Xbox360', 'Games', 19.99, 5),
('Willie Wonka Chocolate Factory', 'Movies', 24.99, 4),
('The Bullet', 'Toys', 69.99, 7),
('Racerback T-Shirt', 'Clothing', 68.99, 18),
('Keurig', 'Housewares', 149.99, 11),
('Television', 'Entertainment', 999.99, 8),
('Grill', 'Outdoors', 115.00, 4),
('Wedges', 'Shoes', 5.99, 7),
('iPad', 'Electronics', 499.99, 10)
;