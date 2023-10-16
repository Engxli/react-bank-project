const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const getTheseFromObject = require("../../utils/getTheseFromObject");

const getMyTransacations = async (req, res, next) => {
  try {
    const thingsToSelect = ["transactions"];
    let transactions = await req.user.populate("transactions");
    transactions = getTheseFromObject(thingsToSelect, transactions);
    res.status(200).json(transactions.transactions);
  } catch (error) {
    next(error);
  }
};

const deposit = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const trans = await Transaction.create({
      amount: amount,
      type: "deposit",
      from: req.user._id,
      to: req.user._id,
    });
    await req.user.updateOne({
      balance: +req.user.balance + +amount,
      $push: { transactions: trans },
    });
    return res.status(200).json({ msg: "Done" });
  } catch (error) {
    next(error);
  }
};

const withdraw = async (req, res, next) => {
  try {
    const { amount } = req.body;
    let balance = +req.user.balance;
    if (+amount <= +balance) {
      balance = balance - amount;

      const trans = await Transaction.create({
        amount: amount,
        type: "withdraw",
        from: req.user._id,
        to: req.user._id,
      });

      await req.user.updateOne({
        balance,
        $push: { transactions: trans },
      });

      return res.status(200).json({ msg: "Done" });
    } else {
      res
        .status(403)
        .json({ msg: "you can not withdraw more than what you have" });
    }
  } catch (error) {
    next(error);
  }
};

const transfer = async (req, res, next) => {
  try {
    const amount = +req.body.amount;
    const balance = +req.user.balance;
    const foundUser = await User.findOne({ username: req.params.username });
    if (!foundUser) return res.status(404).json({ msg: "user not found" });

    if (amount <= balance) {
      const trans = await Transaction.create({
        amount: amount,
        type: "transfer",
        from: req.user._id,
        to: foundUser._id,
      });

      await req.user.updateOne({
        balance: +req.user.balance - +amount,
        $push: { transactions: trans },
      });
      await foundUser.updateOne({
        balance: +foundUser.balance + +amount,
        $push: { transactions: trans },
      });

      res.status(201).json({ msg: "Transaction Done" });
    } else {
      res.status(403).json({ msg: "you dont have enough balance" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyTransacations,
  deposit,
  withdraw,
  transfer,
};
