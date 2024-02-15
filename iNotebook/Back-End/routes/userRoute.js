const express = require("express");
const bcryptjs = require("bcryptjs");
const userDB = require("../models/SignUp");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchUserDetails = require("../middleWare/UserDetails");
const dotenv = require("dotenv");
dotenv.config();
const secretPassword = process.env.INOTEBOOK_SECRET_PASSWORD;

const router = express.Router();

const validateSignUp = [
  body("name").isLength({ min: 5 }),
  body("email").isEmail(),
  body("phoneNumber")
    .matches(/^[0-9]{10,15}$/)
    .withMessage("Phone number must be 10-15 digits"),
  body("password").isLength({ min: 12 }),
];

const validateLogin = [
  body("email").isEmail(),
  body("password").isLength({ min: 12 }),
];

router.post("/signup", validateSignUp, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userExists = await userDB.findOne({
      $or: [
        { name: { $regex: new RegExp(`^${req.body.name}$`, "i") } },
        { email: { $regex: new RegExp(`^${req.body.email}$`, "i") } },
      ],
    });
    
    if (userExists) {
      return res.status(200).json({ error: "User already exists!" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new userDB({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      hash: salt,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.post("/login", validateLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await userDB.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).json({ error:"User not found!"});
      return;
    }

    const isPasswordValid = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      res.status(200).json({error: "Invalid email or password!"});
      return;
    }

    const authData = { userData: { user: user.id } };
    const authToken = jwt.sign(authData, secretPassword);
    // console.log(authData);
    // console.log(authToken);

    const message = "User Logged In Successfully!";
    res.status(200).json({ message, authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/getUserDetails", fetchUserDetails, async (req, res) => {
  try {
    const userID = req.authData;
    const userDetails = await userDB
      .findById(userID)
      .select("-password -phoneNumber -hash");
    res.send(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
