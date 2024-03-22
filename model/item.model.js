import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      default: 10,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "appetizer",
        "main-course",
        "dessert",
        "beverage",
        "soup",
        "salad",
        "side-dish",
        "bread",
        "breakfast",
        "lunch",
        "dinner",
        "snack",
        "beverage",
        "sauce",
        "drink",
        "condiment",
        "spice",
        "herb",
        "soup",
        "sauce",
      ],
    },
    ingredients: {
      type: Array,
      required: true,
    },

    images: {
      type: Array,
      required: true,
    },
    isOffer: {
      type: Boolean,
      required: true,
      default: false,
    },
    offerPrice: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
