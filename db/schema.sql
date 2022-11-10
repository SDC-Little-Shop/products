DROP TABLE IF EXISTS related;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS products;


CREATE TABLE products (
  id INT,
  name text,
  slogan text,
  description text,
  category text,
  default_price INT,
  PRIMARY KEY (id)
);

CREATE TABLE related (
  id INT,
  current_product_id INT,
  related_product_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_current_product_id
    FOREIGN KEY (current_product_id)
      REFERENCES products(id)
);

CREATE TABLE features (
  id INT,
  product_id INT,
  feature text,
  value text,
  PRIMARY KEY (id),
    CONSTRAINT fk_product_id
      FOREIGN KEY (product_id)
        REFERENCES products(id)
);


CREATE TABLE styles (
  id INT,
  productId INT,
  name text,
  sale_price text,
  original_price INT,
  default_style INT,
  PRIMARY KEY (id),
    CONSTRAINT fk_productId
      FOREIGN KEY (productId)
        REFERENCES products(id)
);

CREATE TABLE skus (
  id INT,
  styleId INT,
  size text,
  quantity INT,
  PRIMARY KEY (id),
    CONSTRAINT fk_styleId
      FOREIGN KEY (styleId)
        REFERENCES styles(id)
);

CREATE TABLE photos (
  id INT,
  styleId INT,
  url text,
  thumbnail_url TEXT,
  PRIMARY KEY (id),
    CONSTRAINT fk_styleId
      FOREIGN KEY (styleId)
        REFERENCES styles(id)
);



COPY products(id, name, slogan, description, category, default_price)
FROM '/Users/eric/hackreactor/SDC/Frontend-Capstone-Ecommerce/api/overview/data/product.csv'
DELIMITER ','
CSV HEADER;

COPY related(id, current_product_id, related_product_id)
FROM '/Users/eric/hackreactor/SDC/Frontend-Capstone-Ecommerce/api/overview/data/related.csv'
DELIMITER ','
CSV HEADER;

COPY features(id, product_id, feature, value)
FROM '/Users/eric/hackreactor/SDC/Frontend-Capstone-Ecommerce/api/overview/data/features.csv'
DELIMITER ','
CSV HEADER;

COPY styles(id,productId,name,sale_price,original_price,default_style)
FROM '/Users/eric/hackreactor/SDC/Frontend-Capstone-Ecommerce/api/overview/data/styles.csv'
DELIMITER ','
CSV HEADER;

COPY skus(id,styleId,size,quantity)
FROM '/Users/eric/hackreactor/SDC/Frontend-Capstone-Ecommerce/api/overview/data/skus.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id,styleId,url,thumbnail_url)
FROM '/Users/eric/hackreactor/SDC/Frontend-Capstone-Ecommerce/api/overview/data/photos.csv'
DELIMITER ','
CSV HEADER;


CREATE index related_current_product_id
ON related(current_product_id);

CREATE index features_product_id
ON features(product_id);

CREATE index styles_productId
ON styles(productId);

CREATE index skus_styleId
ON skus(styleId);

CREATE index photos_styleId
ON photos(styleId);



