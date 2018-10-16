const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//../models/rx_drugbank_data_model
const drug = require("../models/rx_drugbank_data_model");

router.get("/", (req, res, next) => {
    drug.find()
        .exec()
        .then(docs => {
            console.log(docs);
            //   if (docs.length >= 0) {
            res.status(200).json(docs);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;