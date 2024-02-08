const express = require("express");
const router = express.Router();
const zod = require("zod");
const dbConnect = require("../db");

const { User } = require("../models/UserSchema");
const { Account } = require("../models/AccountSchema");
const { sign } = require("jsonwebtoken");

const signUpBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  console.log("Inside Signin Route", req.body);
  try {
    const client = await dbConnect();
    const { success } = signInBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Email does not exists or Incorrect Inputs",
      });
    }

    const database = client.db("paytm");
    const collection = database.collection("User");

    const existingUser = await collection.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    console.log("USer Data is ", existingUser);

    if (existingUser) {
      return res.status(200).json({
        data: existingUser,
      });
    } else {
      console.log("Error Logging User");
      return res.status(400).json({
        message: "User Doesn't Not exist try to SignUp",
      });
    }
  } catch (err) {
    console.log("Error Signing User", err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const client = await dbConnect();

    const { success } = signUpBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Email already taken/Incorrect Inputs",
      });
    }
    const database = client.db("paytm");
    const collection = database.collection("User");

    const existingUser = await collection.findOne({
      username: req.body.username,
    });

    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken/Incorrect inputs",
      });
    }
    const userData = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    const user = await collection.insertOne(userData);
    const intialBalance = req.body.initialBalance;
    const userIdA = user.insertedId.toHexString();
    const Accountcollection = database.collection("Account");
    await Accountcollection.insertOne({
      userId: userIdA,
      balance: 100,
    });

    res.status(200).json({
      message: "Successfully Created User",
    });
  } catch (err) {
    console.log("Error in Signing Up", err);
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    const client = await dbConnect();
    const database = client.db("paytm");
    const collection = database.collection("User");
    const userData = await collection.find({}).toArray();
    // console.log(userData);
    res.status(200).json({
      userData,
    });
  } catch (err) {
    console.log("Error in Getting Users", err);
  }
});

module.exports = router;
