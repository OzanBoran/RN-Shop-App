
const order = [{
  products: [
    {
      products_name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      products_price: {
        type: Number,
        required: true,
      },
      products_picture: {
        type: String,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    members_name: {
      type: String,
      required: true,
    },
    members_gsm: {
      type: String,
      required: true,
    },
    members_address: {
      type: String,
      required: true,
    },
    cities_cityid: {
      type: String,
      required: true,
    },
    towns_townid: {
      type: String,
      required: true,
    },
    quarter: {
      type: String,
      required: true,
    },
    members_postcode: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}];

module.exports = order;
