const { Schema, model } = require("mongoose");
const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    slug: { type: String, unique: true },
    image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  this.slug = generateSlug(this.name);
  next();
});

categorySchema.index({ name: "text" });

module.exports = model("Category", categorySchema);
