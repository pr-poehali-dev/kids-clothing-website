-- Создание таблицы товаров
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    old_price INTEGER,
    image_url TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('boy', 'girl', 'unisex')),
    age_group VARCHAR(20) NOT NULL CHECK (age_group IN ('0-3', '3-7', '7-12')),
    is_new BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы размеров товаров
CREATE TABLE IF NOT EXISTS product_sizes (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    size VARCHAR(10) NOT NULL,
    in_stock BOOLEAN DEFAULT true
);

-- Создание таблицы корзины
CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    product_id INTEGER NOT NULL REFERENCES products(id),
    size VARCHAR(10) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_gender ON products(gender);
CREATE INDEX IF NOT EXISTS idx_products_age_group ON products(age_group);
CREATE INDEX IF NOT EXISTS idx_cart_session ON cart_items(session_id);

-- Вставка тестовых данных
INSERT INTO products (name, price, old_price, image_url, category, gender, age_group, is_new) VALUES
('Летний комплект для мальчика', 2490, 3560, 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/626b9215-334f-4c88-86a2-705c9b06836d.jpg', 'Комплекты', 'boy', '0-3', true),
('Платье для девочки с рюшами', 3290, NULL, 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/c9ff5197-c89a-4430-9a1d-99f9630fd7c4.jpg', 'Платья', 'girl', '0-3', true),
('Футболка с принтом космос', 890, NULL, 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/626b9215-334f-4c88-86a2-705c9b06836d.jpg', 'Футболки', 'boy', '3-7', false),
('Джинсовая куртка', 4200, 5600, 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/2727d0b5-1f68-4257-8c44-a50484a42959.jpg', 'Верхняя одежда', 'unisex', '7-12', false),
('Спортивный костюм', 2890, NULL, 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/626b9215-334f-4c88-86a2-705c9b06836d.jpg', 'Костюмы', 'unisex', '3-7', false),
('Теплая толстовка с капюшоном', 1990, NULL, 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/c9ff5197-c89a-4430-9a1d-99f9630fd7c4.jpg', 'Толстовки', 'girl', '0-3', true);

-- Вставка размеров для товаров
INSERT INTO product_sizes (product_id, size) VALUES
(1, '92'), (1, '98'), (1, '104'), (1, '110'),
(2, '86'), (2, '92'), (2, '98'), (2, '104'),
(3, '110'), (3, '116'), (3, '122'), (3, '128'), (3, '134'),
(4, '128'), (4, '134'), (4, '140'), (4, '146'),
(5, '110'), (5, '116'), (5, '122'), (5, '128'),
(6, '92'), (6, '98'), (6, '104'), (6, '110'), (6, '116');