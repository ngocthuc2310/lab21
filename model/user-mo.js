const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  cart: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: false,
      },
      quantity: { type: Number, required: false },
    },
  ],
});

userSchema.methods.addCart = function (product) {
  const cartProIndex = this.cart.findIndex(
    (cp) => cp.productId.toString() === product._id.toString()
  );
  let quantity = 1;
  const cart = [...this.cart];
  if (cartProIndex >= 0) {
    cart[cartProIndex].quantity += 1;
  } else {
    cart.push({
      productId: product._id,
      quantity,
    });
  }
  this.cart = cart;
  return this.save();
};

module.exports = mongoose.model("user", userSchema);
