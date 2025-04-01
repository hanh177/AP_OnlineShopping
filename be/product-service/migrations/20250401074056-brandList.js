const sampleBrands = [
  {
    name: "Apple",
    slug: "apple",
    description:
      "Leading technology company specializing in consumer electronics.",
    logo: "https://example.com/logos/apple.png",
    isActive: true,
  },
  {
    name: "Samsung",
    slug: "samsung",
    description: "Global leader in smartphones and home appliances.",
    logo: "https://example.com/logos/samsung.png",
    isActive: true,
  },
  {
    name: "Nike",
    slug: "nike",
    description: "World-renowned sportswear and footwear brand.",
    logo: "https://example.com/logos/nike.png",
    isActive: true,
  },
  {
    name: "Adidas",
    slug: "adidas",
    description: "Famous for sports apparel and accessories.",
    logo: "https://example.com/logos/adidas.png",
    isActive: false,
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

    await db.collection("brands").insertMany(sampleBrands);
    console.log("Migrated sample brands successfully");
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
    const brandNames = sampleBrands.map((brand) => brand.name);
    await db.collection("brands").deleteMany({ name: { $in: brandNames } });
    console.log("Rolled back sample brands migration");
  },
};
