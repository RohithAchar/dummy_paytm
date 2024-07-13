const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");

const { JWT_SECRET } = require("../config");

const userRoute = express.Router();

const signUpSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
const signInSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});
const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

userRoute.post("/signup", async (req, res) => {
  const result = signUpSchema.safeParse(req.body);
  const { username, firstName, lastName, password } = req.body;
  if (!result.success) {
    res.status(411).json({
      message: "Incorrect input",
    });
    return;
  }

  const isUserExists = await User.findOne({
    username,
  });
  if (isUserExists) {
    res.status(411).json({
      message: "Username already exists",
    });
    return;
  }

  const user = await User.create({
    username,
    firstName,
    lastName,
    password,
  });
  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  const randomAmount = Math.random() * 10000 + 1;

  await Account.create({
    userId: userId,
    balance: randomAmount,
  });

  res.json({
    msg: "User created successfully",
    token: token,
  });
});

userRoute.post("/signin", async (req, res) => {
  const { success } = signInSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Invalid username and password",
    });
  }

  const { username, password } = req.body;
  const user = await User.findOne({
    username,
    password,
  });
  if (!user) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({
    token: token,
  });
});

userRoute.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

userRoute.get("/bulk", authMiddleware, async (req, res) => {
  const { filter } = req.query || "";
  const users = await User.find({
    $or: [
      {
        firstName: { $regex: filter },
      },
      {
        lastName: { $regex: filter },
      },
    ],
  });
  const filteredUsers = users.map((user) => {
    const { username, firstName, lastName, _id } = user;
    return {
      username,
      firstName,
      lastName,
      _id,
    };
  });
  res.json({
    users: filteredUsers,
  });
});

module.exports = userRoute;
