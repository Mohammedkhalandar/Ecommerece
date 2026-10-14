-- Give older seeded products a category image when no product image exists.
UPDATE products p
JOIN categories c ON c.id = p.category_id
SET p.thumbnail_url = c.image_url
WHERE (p.thumbnail_url IS NULL OR p.thumbnail_url = '')
  AND c.image_url IS NOT NULL
  AND c.image_url <> '';

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
