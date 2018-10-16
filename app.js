const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const drugRoutes = require("./api/routes/dbca_pharm");
//const orderRoutes = require("./api/routes/orders");
// 'mongodb://admin:nextel12@ds125293.mlab.com:25293/rx_drugbank_data');
mongoose.connect(
    "mongodb://admin:nextel12@ds125293.mlab.com:25293/rx_drugbank_data", {
        useMongoClient: true
    }
);

// mongoose.connect(
//     "mongodb://admin:nextel12@ds125293.mlab.com:25293/rx_drugbank_data"
// );

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET");
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
//app.use("/dbca_pharm", drugRoutes);
// app.use(drugRoutes);
// routes.initialize(app);
//app.use("/orders", orderRoutes);
app.use("/drugs", drugRoutes);
//app.use("/", drugRoutes);
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;