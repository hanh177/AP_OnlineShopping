const sampleCategories = [
  {
    name: "Electronics",
    description: "Devices and gadgets",
    image: "https://example.com/images/electronics.png",
    isActive: true,
    parent: null,
    slug: "devices-and-gadgets",
  },
  {
    name: "Smartphones",
    description: "Mobile phones and accessories",
    image: "https://example.com/images/smartphones.png",
    isActive: true,
    parent: null,
    slug: "mobile-phones-and-accessories",
  },
  {
    name: "Laptops",
    description: "Portable computers",
    image: "https://example.com/images/laptops.png",
    isActive: true,
    parent: null,
    slug: "portable-computers",
  },
  {
    name: "Clothing",
    description: "Fashion and apparel",
    image: "https://example.com/images/clothing.png",
    isActive: true,
    parent: null,
    slug: "fashion-and-apparel",
  },
  {
    name: "Men's Clothing",
    description: "Clothing for men",
    image: "https://example.com/images/mens-clothing.png",
    isActive: true,
    parent: null,
    slug: "clothing-for-men",
  },
  {
    name: "Women's Clothing",
    description: "Clothing for women",
    image: "https://example.com/images/womens-clothing.png",
    isActive: true,
    parent: null,
    slug: "clothing-for-women",
  },
  {
    name: "Accessories",
    description: "Accessories for men and women",
    image: "https://example.com/images/accessories.png",
    isActive: true,
    parent: null,
    slug: "accessories-for-men-and-women",
  },
  {
    name: "Shoes",
    description: "Footwear for men and women",
    image: "https://example.com/images/shoes.png",
    isActive: true,
    parent: null,
    slug: "footwear-for-men-and-women",
  },
  {
    name: "Jewelry",
    description: "Jewelry for men and women",
    image: "https://example.com/images/jewelry.png",
    isActive: true,
    parent: null,
    slug: "jewelry-for-men-and-women",
  },
  {
    name: "Watches",
    description: "Watches for men and women",
    image: "https://example.com/images/watches.png",
    isActive: true,
    parent: null,
    slug: "watches-for-men-and-women",
  },
];

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection("categories").insertMany(sampleCategories);
    console.log("Migrated sample categories successfully");
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    const catagorySlugs = sampleCategories.map((category) => category.slug);
    await db
      .collection("categories")
      .deleteMany({ slug: { $in: catagorySlugs } });
    console.log("Rolled back sample categories migration");
  },
};
