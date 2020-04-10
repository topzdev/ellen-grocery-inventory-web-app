SELECT 
product.barcode,
product.product_name,
product.quantity,
product.quantity_max,
product.quantity_min,
product.price,
product.description,
product.brand_id,
product.supplier_id,
product.category_id,
brand.brand_name,
category.category_name,
supplier.supplier_name
FROM product_table product 
INNER JOIN brand_table brand ON product.brand_id = brand.brand_id 
INNER JOIN category_table category ON product.category_id = category.category_id 
INNER JOIN supplier_table supplier ON product.supplier_id = supplier.supplier_id