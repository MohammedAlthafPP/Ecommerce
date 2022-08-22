const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require ("cors")

app.use(
    cors({
        origin: ["http://localhost:3000"],
        method : ["GET","POST","PUT","DELETE"],
        credentials: true,
    })
);



const erroeMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

// Route Import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//MiddlewRware for Errors
app.use(erroeMiddleware);

app.use(
    cors({
        origin: ["http://localhost:3000"],
        method : ["GET","POST","PUT","DELETE"],
        credentials: true,
    })
);

module.exports = app;
