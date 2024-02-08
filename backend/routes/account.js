const express = require("express");
const router = express.Router();
const dbConnect = require("../db");

const { User } = require("../models/UserSchema");
const { Account } = require("../models/AccountSchema");
const mongoose = require("mongoose");

router.post("/getBalance", async (req, res) => {
  try {
    const client = await dbConnect();
    const database = client.db("paytm");
    const collection = database.collection("Account");
    const existingUser = await collection.findOne({
      userId: req.body.userId,
    });
  
    if (existingUser) {
      res.status(200).json({
        message: `Available Balance is ${existingUser.balance}`,
        balance:existingUser.balance
      });
    } else {
      res.status(404).json({
        message: "No Such User Exists",
      });
    }
  } catch (err) {
    console.log("Some Error Occured connecting DB");
    res.status(404).json({
      message: "No Such User Exists",
    });
  }
});

router.post("/transfer", async (req, res) => {
  try {
    const client = await dbConnect();
    const database = client.db("paytm");
    const collection = database.collection("Account");

    const { amount, to, from } = req.body;
    const account = await collection.findOne({ userId: from });

    if (!account || account.balance < amount) {
      return res.status(400).json({
        message: "Insufficient Balance",
      });
    }

    const toAccount = await collection.findOne({ userId: to });

    if (!toAccount) {
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    await collection.updateOne(
      { userId: from },
      { $inc: { balance: -amount } }
    );
    await collection.updateOne({ userId: to }, { $inc: { balance: amount } });

    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.error("Error during transfer:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;

// function waitForMongooseConnection(mongoose) {
//   return new Promise((resolve) => {
//       const connection = mongoose.connection;
//       if (connection.readyState === 1) {
//           resolve();
//           return;
//       }
//       console.log('Mongoose connection is not ready. Waiting for open or reconnect event.');
//       let resolved = false;
//       const setResolved = () => {
//           console.log('Mongoose connection became ready. promise already resolved: ' + resolved);
//           if (!resolved) {
//               console.log('Resolving waitForMongooseConnection');
//               resolved = true;
//               resolve();
//           }
//       };
//       connection.once('open', setResolved);
//       connection.once('reconnect', setResolved);
//   });
// }

// router.post("/transfer", async (req, res) => {
//   try {
//     const client = await dbConnect();
//     const database = client.db("paytm");
//     console.log(req.body);
//     const collection = database.collection("Account");
//     const session = await mongoose.startSession();

//     session.startTransaction();
//     console.log("Session Started");
//     const { amount, to, from } = req.body;

//     // Fetch the accounts within the transaction
//     const account = await collection.findOne({ userId: from }).session(session);

//     if (!account || account.balance < amount) {
//       await session.abortTransaction();
//       return res.status(400).json({
//         message: "Insufficient balance",
//       });
//     }

//     const toAccount = await collection.findOne({ userId: to }).session(session);

//     if (!toAccount) {
//       await session.abortTransaction();
//       return res.status(400).json({
//         message: "Invalid account",
//       });
//     }

//     // Perform the transfer
//     await collection
//       .updateOne({ userId: from }, { $inc: { balance: -amount } })
//       .session(session);
//     await collection
//       .updateOne({ userId: to }, { $inc: { balance: amount } })
//       .session(session);

//     // Commit the transaction
//     await session.commitTransaction();
//     res.json({
//       message: "Transfer successful",
//     });
//   } catch (err) {
//     console.log("Failed Transaction", err);
//   }
// });
