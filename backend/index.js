import express from "express";
import mongoose from "mongoose";
import productModel from "./model/productModel.js";
import cors from "cors";
import upload from "./middleware/upload.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

await mongoose.connect(process.env.MONGODB_URI);
console.log("Connected to DB");

// Add product route

app.post("/addProduct", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const {
    name,
    price,
    currencyCode,
    numberOfSales,
    rating,
    freeShipping,
    shopName,
  } = req.body;
  const image = req.file?.filename;
  if (
    !name ||
    !price ||
    !currencyCode ||
    !shopName ||
    !numberOfSales ||
    !rating ||
    !freeShipping ||
    !image
  ) {
    res.send({ message: "Please fill all the fields", success: false });
    return false;
  }
  const productData = await productModel.create({
    name,
    price,
    currencyCode,
    numberOfSales,
    rating,
    freeShipping,
    shopName,
    image,
  });
  res.send({
    message: "Product added successfully",
    success: true,
    result: productData,
  });
});

// Get all products route
app.get("/getProducts", async (req, res) => {
  const products = await productModel.find();

  if (products) {
    console.log("Products fetched successfully");
    res.send({
      success: true,
      result: products,
    });
  } else {
    console.log("Failed to fetch products");
    res.send({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

// Populate Data

app.get("/getProduct/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);

  if (product) {
    res.send({
      success: true,
      result: product,
    });
  } else {
    res.send({
      success: false,
      message: "Product not found",
    });
  }
});
//Update Method:

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  const updateProductData = await productModel.findByIdAndUpdate(id, req.body);

  console.log(updateProductData);

  if (updateProductData) {
    res.send({
      message: "Data Updated",
      success: true,
      result: updateProductData,
    });
  } else {
    res.send({
      success: false,
      message: "Failed to update data",
    });
  }
});

// Delete Method:

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const deleteProductData = await productModel.findByIdAndDelete(id);

  console.log(deleteProductData);

  if (deleteProductData) {
    res.send({
      message: "Data Deleted",
      success: true,
      result: deleteProductData,
    });
  } else {
    res.send({
      success: false,
      message: "Failed to delete data",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
