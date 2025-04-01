const { Schema, model } = require("mongoose");
const { generateSlug } = require("../../utils");
const brandSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    slug: { type: String, unique: true },
    logo: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

brandSchema.pre("save", function (next) {
  this.slug = generateSlug(this.name);
  next();
});

brandSchema.index({ name: "text" });

module.exports = model("Brand", brandSchema);
