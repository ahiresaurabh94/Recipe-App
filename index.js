const express = require("express");
const mongoose = require("mongoose");
const RegisterRoute = require("./routes/registerRoute");
const SigninRoute = require("./routes/signInRoute");

const bodyparser = require("body-parser");

const port = process.env.port || 9000;
const DB = process.env.DATABASE_URL || "mongodb://127.0.0.1/AppRecipe"

// const DB ="mongodb+srv://root:Saurabh123@cluster0.s3gqqpi.mongodb.net/?retryWrites=true&w=majority" ;
const app = express();

var cors = require('cors') 
app.use(cors())


app.use(bodyparser.json());
app.use(express.json());
mongoose.set("strictQuery", false);

mongoose.connect(DB, (e) => {
  if (e) {
    console.log(e.message);
  }
  console.log("Connected to DB");
});

app.use("/user/register", RegisterRoute);
app.use("/user/signin", SigninRoute);

const auth = require("./authentication/auth");
const productList = require("./productList");
// const orderRoute = require("./src/router/orderRoutes");
const productRoute = require("./routes/productRoute");

app.use(express.static("public"));

// app.use("/api/v1/orders", auth, orderRoute);
app.use("/api/v1/product", productRoute);

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});
app.listen(port, () => {
  console.log(`server is setup at port ${port}`);
});

productList();
