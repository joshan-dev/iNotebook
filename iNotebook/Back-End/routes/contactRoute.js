const express = require("express");
const fetchUserDetails = require ("../middleWare/UserDetails");
const contactDB = require("../models/Contact");

// initializing our Routes!
const router = express.Router();

router.post(
    "/",
    fetchUserDetails,
    async (req, res) => {

      try {
        const contact = new contactDB({
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          description: req.body.description,
        });
  
        await contact.save();
        res.status(201).json({ message: "User Contact Successfully!" });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: "An error occurred while contacting the website admin!",
        });
      }
    }
  );

module.exports = router;