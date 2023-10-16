const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  type: {
    type: String,
    enum: ["transfer", "deposit", "withdraw"],
  },
  amount: Number,
  from: { type: Schema.Types.ObjectId, ref: "User" },
  to: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
