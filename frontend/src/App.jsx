import React from "react";
import AddProduct from "./components/AddProduct";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import { Routes, Route } from "react-router-dom";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <div className="h-screen overflow-y-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
