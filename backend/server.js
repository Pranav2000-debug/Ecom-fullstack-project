const express = require("express");
const dotenv = require("dotenv");
const { userRoutes } = require("./routes/userRoutes.js");
const { default: mongoose } = require("mongoose");
const cors = require('cors');
const productRoutes = require("./routes/product.route.js");

const app = express();

dotenv.config();
const port = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

try {
  mongoose.connect(MONGO_URL);
  console.log("DB IS CONNECTED");
} catch (err) {
  console.log(err);
}

// Application level
app.use(express.json());

app.use(cors());
app.use(userRoutes);
app.use(productRoutes);

app.listen(port, () => {
  console.log(`Server is running... 
    Port: http://localhost:${port}`);
});
