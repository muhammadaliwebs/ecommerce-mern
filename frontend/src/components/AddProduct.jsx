import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function AddProduct() {
  const [productData, setProductData] = useState({ freeShipping: "Yes" });

  const navigate = useNavigate();
  const handleProductData = async (e) => {
    e.preventDefault();

    console.log("========== Frontend ==========");
    console.log("Product Data:", productData);

    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("currencyCode", productData.currencyCode);
    formData.append("numberOfSales", productData.numberOfSales);
    formData.append("rating", productData.rating);
    formData.append("freeShipping", productData.freeShipping);
    formData.append("shopName", productData.shopName);
    formData.append("image", productData.image);

    let result = await fetch("http://localhost:3000/addProduct", {
      method: "POST",
      body: formData,
    });

    console.log("Response Status:", result.status);

    result = await result.json();

    console.log("Response:", result);

    if (result.success) {
      Swal.fire({
        title: "Success!",
        text: "Product added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Failed to add product.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1e293b_0%,#0f172a_35%,#020617_100%)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl shadow-cyan-900/30 p-10">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/40">
            📦
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Add Product
          </h1>

          <p className="text-slate-300 mt-2">
            Fill in the details below to add a new product.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleProductData}>
          <div>
            <label
              htmlFor="productName"
              className="block mb-2 text-sm font-semibold text-slate-200"
            >
              Product Name
            </label>

            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="MacBook Pro"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="productPrice"
                className="block mb-2 text-sm font-semibold text-slate-200"
              >
                Price
              </label>

              <input
                type="number"
                id="productPrice"
                name="productPrice"
                placeholder="999"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label
                htmlFor="currencyCode"
                className="block mb-2 text-sm font-semibold text-slate-200"
              >
                Currency
              </label>

              <input
                type="text"
                id="currencyCode"
                name="currencyCode"
                placeholder="USD"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    currencyCode: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="numberOfSales"
                className="block mb-2 text-sm font-semibold text-slate-200"
              >
                Number of Sales
              </label>

              <input
                type="number"
                id="numberOfSales"
                name="numberOfSales"
                placeholder="150"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    numberOfSales: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label
                htmlFor="productRating"
                className="block mb-2 text-sm font-semibold text-slate-200"
              >
                Rating
              </label>

              <input
                type="number"
                id="productRating"
                name="productRating"
                placeholder="4.8"
                min="0"
                max="5"
                step="0.1"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    rating: parseFloat(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="freeShipping"
              className="block mb-2 text-sm font-semibold text-slate-200"
            >
              Free Shipping
            </label>

            <select
              id="freeShipping"
              name="freeShipping"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
              onChange={(e) =>
                setProductData({ ...productData, freeShipping: e.target.value })
              }
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="shopName"
              className="block mb-2 text-sm font-semibold text-slate-200"
            >
              Shop Name
            </label>

            <input
              type="text"
              id="shopName"
              name="shopName"
              placeholder="Tech Store"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
              onChange={(e) =>
                setProductData({ ...productData, shopName: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-semibold text-slate-200"
            >
              Product Image
            </label>

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white"
              onChange={(e) =>
                setProductData({
                  ...productData,
                  image: e.target.files[0],
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 py-3 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/30 active:scale-95"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
