const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const accountRoute = express.Router();

accountRoute.get("/balance", authMiddleware, async (req, res) => {
  const { balance } = await Account.findOne({ userId: req.userId });
  res.json({
    balance: balance,
  });
});

accountRoute.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { to, amount } = req.body;

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  const fromAccount = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (fromAccount.balance < parseFloat(amount)) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccountAmount = toAccount.balance + amount;
  const fromAccountAmount = fromAccount.balance - amount;

  await Account.updateOne(
    { userId: toAccount.userId },
    { $set: { balance: toAccountAmount } }
  ).session(session);

  await Account.updateOne(
    { userId: req.userId },
    { $set: { balance: fromAccountAmount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = accountRoute;
