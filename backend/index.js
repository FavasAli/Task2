import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRoutes from "./router/userRoutes.js";
import productRoutes from "./router/productRoutes.js";
const app = express();

dotenv.config();
connectDb();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log("first");
  res.status(statusCode);
  res.json({
    message: err.message,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server started at port 5000");
});
