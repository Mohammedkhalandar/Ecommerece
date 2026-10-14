-- Populate product and category images for the existing demo catalog.
UPDATE categories
SET image_url = CASE slug
    WHEN 'electronics' THEN 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80'
    WHEN 'fashion' THEN 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'
    WHEN 'home-kitchen' THEN 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80'
    WHEN 'books' THEN 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80'
    WHEN 'sports-fitness' THEN 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80'
    WHEN 'beauty-personal' THEN 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80'
    WHEN 'toys-games' THEN 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80'
    WHEN 'grocery' THEN 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80'
    ELSE image_url
END
WHERE image_url IS NULL OR image_url = '';

UPDATE products
SET thumbnail_url = CASE slug
    WHEN 'iphone-16-pro' THEN 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'
    WHEN 'samsung-galaxy-s25' THEN 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80'
    WHEN 'oneplus-13' THEN 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'
    WHEN 'asus-gaming-laptop' THEN 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80'
    WHEN 'sony-wireless-headphones' THEN 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'
    WHEN 'apple-watch' THEN 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'
    WHEN 'bluetooth-speaker' THEN 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=600&q=80'
    WHEN 'mens-hoodie' THEN 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80'
    WHEN 'premium-tshirt' THEN 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'
    WHEN 'sneakers' THEN 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'
    WHEN 'fashion-smart-watch' THEN 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'
    WHEN 'womens-kurti' THEN 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80'
    WHEN 'denim-jacket' THEN 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'
    WHEN 'coffee-maker' THEN 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80'
    WHEN 'led-table-lamp' THEN 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80'
    WHEN 'smart-led-bulb' THEN 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80'
    WHEN 'study-table' THEN 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80'
    WHEN 'air-purifier' THEN 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80'
    WHEN 'clean-code' THEN 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80'
    WHEN 'atomic-habits' THEN 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80'
    WHEN 'pragmatic-programmer' THEN 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80'
    WHEN 'rich-dad-poor-dad' THEN 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80'
    WHEN 'cricket-bat' THEN 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80'
    WHEN 'football' THEN 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80'
    WHEN 'gym-gloves' THEN 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80'
    WHEN 'yoga-mat' THEN 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80'
    WHEN 'face-wash' THEN 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80'
    WHEN 'perfume' THEN 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80'
    WHEN 'skin-care-kit' THEN 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80'
    WHEN 'matte-lipstick' THEN 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80'
    ELSE thumbnail_url
END
WHERE thumbnail_url IS NULL OR thumbnail_url = '';

INSERT INTO products (
    name, slug, sku, short_description, price, original_price, discount_percent,
    stock_quantity, category_id, brand, is_active, is_featured, is_best_seller,
    avg_rating, review_count, thumbnail_url
)
SELECT 'Kids Building Blocks Set', 'kids-building-blocks', 'SKU-031',
       'Creative construction blocks for imaginative play', 799.00, 999.00, 20.02,
       80, c.id, 'PlayBuild', 1, 1, 0, 4.6, 42,
       'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80'
FROM categories c
WHERE c.slug = 'toys-games'
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'kids-building-blocks');

INSERT INTO products (
    name, slug, sku, short_description, price, original_price, discount_percent,
    stock_quantity, category_id, brand, is_active, is_featured, is_best_seller,
    avg_rating, review_count, thumbnail_url
)
SELECT 'Family Board Game', 'family-board-game', 'SKU-032',
       'A fun strategy game for family game nights', 599.00, 799.00, 25.03,
       65, c.id, 'PlayBuild', 1, 0, 1, 4.5, 28,
       'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&q=80'
FROM categories c
WHERE c.slug = 'toys-games'
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'family-board-game');

INSERT INTO products (
    name, slug, sku, short_description, price, original_price, discount_percent,
    stock_quantity, category_id, brand, is_active, is_featured, is_best_seller,
    avg_rating, review_count, thumbnail_url
)
SELECT 'Organic Grocery Essentials', 'organic-grocery-essentials', 'SKU-033',
       'Everyday pantry staples sourced from organic farms', 499.00, 599.00, 16.69,
       120, c.id, 'FarmFresh', 1, 1, 1, 4.7, 64,
       'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80'
FROM categories c
WHERE c.slug = 'grocery'
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'organic-grocery-essentials');

INSERT INTO products (
    name, slug, sku, short_description, price, original_price, discount_percent,
    stock_quantity, category_id, brand, is_active, is_featured, is_best_seller,
    avg_rating, review_count, thumbnail_url
)
SELECT 'Fresh Fruit Selection', 'fresh-fruit-selection', 'SKU-034',
       'A seasonal selection of fresh fruit for everyday snacking', 349.00, 399.00, 12.53,
       90, c.id, 'FarmFresh', 1, 0, 1, 4.6, 51,
       'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80'
FROM categories c
WHERE c.slug = 'grocery'
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'fresh-fruit-selection');

INSERT INTO product_images (product_id, image_url)
SELECT p.id, p.thumbnail_url
FROM products p
WHERE p.thumbnail_url IS NOT NULL
  AND NOT EXISTS (
      SELECT 1
      FROM product_images pi
      WHERE pi.product_id = p.id
        AND BINARY pi.image_url = BINARY p.thumbnail_url
  );
