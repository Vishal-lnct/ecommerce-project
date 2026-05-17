# import os
# import django
# import csv

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
# django.setup()

# from store.models import Product, Category

# with open('products.csv', newline='', encoding='utf-8') as csvfile:
#     reader = csv.DictReader(csvfile)

#     for row in reader:

#         category, created = Category.objects.get_or_create(
#             name=row['category']
#         )

#         Product.objects.create(
#             name=row['name'],
#             price=row['price'],
#             description=row['description'],
#             image=row['image'],
#             category=category
#         )

# print("Products imported successfully!")


import os
import django
import csv
import random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from store.models import Product, Category


# ---------------- IMAGES ----------------

shoe_images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    "https://images.unsplash.com/photo-1514989940723-e8e51635b782",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
]

watch_images = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56",
    "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
    "https://images.unsplash.com/photo-1547996160-81dfa63595aa",
    "https://images.unsplash.com/photo-1619134778706-7015533a6150",
]

electronics_images = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    "https://images.unsplash.com/photo-1527814050087-3793815479db",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1580894908361-967195033215",
    "https://images.unsplash.com/photo-1498049794561-7780e7231661",
]

clothing_images = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    "https://images.unsplash.com/photo-1445205170230-053b83016050",
]

wallet_images = [
    "https://images.unsplash.com/photo-1627123424574-724758594e93",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    "https://images.unsplash.com/photo-1611078489935-0cb964de46d6",
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
    "https://images.unsplash.com/photo-1627123424574-724758594e93",
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e",
]


# ---------------- IMPORT CSV ----------------

with open('products.csv', newline='', encoding='utf-8') as csvfile:

    reader = csv.DictReader(csvfile)

    for row in reader:

        category, created = Category.objects.get_or_create(
            name=row['category']
        )

        # -------- IMAGE LOGIC --------

        if row['category'] == "Shoes":
            image = random.choice(shoe_images)

        elif row['category'] == "Electronics":
            image = random.choice(electronics_images)

        elif row['category'] == "Clothing":
            image = random.choice(clothing_images)

        elif row['category'] == "Accessories":
            image = random.choice(wallet_images + watch_images)

        else:
            image = "https://via.placeholder.com/400"

        # -------- CREATE PRODUCT --------

        Product.objects.create(
            name=row['name'],
            price=row['price'],
            description=row['description'],
            image=image,
            category=category
        )

print("Products imported successfully!")