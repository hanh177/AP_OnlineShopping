const { Schema, model } = require("mongoose");
const { generateSlug } = require("../../utils");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "active",
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    attributes: { type: Object, default: {} },
  },
  { timestamps: true }
);

productSchema.index({ category: 1, status: 1, price: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ name: "text" });

productSchema.pre("save", function (next) {
  this.slug = generateSlug(this.name);
  next();
});

module.exports = model("Product", productSchema);
