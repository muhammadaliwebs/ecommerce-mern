import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateProduct() {
  const [productData, setProductData] = useState({ freeShipping: "Yes" });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    let result = await fetch(`http://localhost:3000/getProduct/${id}`);

    result = await result.json();

    if (result.success) {
      setProductData(result.result);
    } else {
      alert("Failed to fetch product");
    }
  };

  const updateProductData = async (id) => {
    let result = await fetch(`http://localhost:3000/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    result = await result.json();
    if (result.success) {
      Swal.fire({
        title: "Updated!",
        text: "Product updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Failed to update product.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleProductData = async (e) => {
    e.preventDefault();

    console.log(productData);
    await updateProductData(id);
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
            Update Product
          </h1>

          <p className="text-slate-300 mt-2">Update your product details.</p>
        </div>

        <form className="space-y-5" onSubmit={handleProductData}>
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-200">
              Product Name
            </label>

            <input
              type="text"
              value={productData?.name}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white"
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <input
              type="number"
              value={productData?.price}
              placeholder="Price"
              className="rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white"
              onChange={(e) =>
                setProductData({
                  ...productData,
                  price: parseFloat(e.target.value),
                })
              }
            />

            <input
              type="text"
              value={productData?.currencyCode}
              placeholder="Currency"
              className="rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white"
              onChange={(e) =>
                setProductData({
                  ...productData,
                  currencyCode: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <input
              type="number"
              value={productData?.numberOfSales}
              placeholder="Sales"
              className="rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white"
              onChange={(e) =>
                setProductData({
                  ...productData,
                  numberOfSales: parseInt(e.target.value),
                })
              }
            />

            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={productData?.rating}
              placeholder="Rating"
              className="rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white"
              onChange={(e) =>
                setProductData({
                  ...productData,
                  rating: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <select
            value={productData?.freeShipping}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white"
            onChange={(e) =>
              setProductData({
                ...productData,
                freeShipping: e.target.value,
              })
            }
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <input
            type="text"
            value={productData?.shopName}
            placeholder="Shop Name"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white"
            onChange={(e) =>
              setProductData({
                ...productData,
                shopName: e.target.value,
              })
            }
          />

          <input
            type="file"
            accept="image/*"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-white"
            onChange={(e) =>
              setProductData({
                ...productData,
                image: e.target.files[0],
              })
            }
          />

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 py-3 font-bold text-white hover:scale-[1.02] transition-all"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
