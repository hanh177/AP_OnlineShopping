const slugify = require("slug").default;

const randomString = (length) =>
  Math.random()
    .toString(36)
    .substring(2, 2 + length);

const generateSlug = (base) => slugify(base) + "-" + randomString(6);

module.exports = { randomString, generateSlug };
