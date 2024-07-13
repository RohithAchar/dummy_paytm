const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rohithachar2000:WW1EuFpv0Uk171l9@cluster0.hiix7tj.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
