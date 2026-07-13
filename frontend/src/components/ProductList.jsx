import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ProductList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let list = await fetch(
      "https://ecommerce-mern-production-0d80.up.railway.app/getProducts",
    );
    list = await list.json();

    console.log("Fetched Products:", list);

    if (list.success) {
      setProductList(list.result);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch products.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const deleteProductData = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete it!",
    });

    console.log(result);

    if (result.isConfirmed) {
      let response = await fetch(
        `https://ecommerce-mern-production-0d80.up.railway.app/delete/${id}`,
        {
          method: "DELETE",
        },
      );

      response = await response.json();

      if (response.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
        });

        fetchData();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete product.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1e293b_0%,#0f172a_35%,#020617_100%)] px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Product Collection
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Explore all available products in your inventory.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productList.map((product) => (
            <div
              key={product._id}
              className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20"
            >
              {/* Product Image */}

              <img
                src={`https://ecommerce-mern-production-0d80.up.railway.app/uploads/${product.image}`}
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              {/* Content */}

              <div className="p-6">
                <h2 className="text-2xl font-bold text-white">
                  {product.name}
                </h2>

                <p className="mt-2 text-cyan-400 text-2xl font-bold">
                  {product.price} {product.currencyCode}
                </p>

                <div className="mt-5 space-y-3 text-slate-300">
                  <div className="flex justify-between">
                    <span>⭐ Rating</span>
                    <span>{product.rating}/5</span>
                  </div>

                  <div className="flex justify-between">
                    <span>📦 Sales</span>
                    <span>{product.numberOfSales}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>🏪 Shop</span>
                    <span>{product.shopName}</span>
                  </div>
                </div>

                <div className="mt-6">
                  {product.freeShipping === "Yes" ? (
                    <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
                      🚚 Free Shipping
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400">
                      ❌ Paid Shipping
                    </span>
                  )}
                  <div className="mt-6 flex gap-2">
                    <button className="flex-1 rounded-lg cursor-pointer bg-gradient-to-r from-emerald-500 to-green-600 py-2 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30">
                      <Link to={`/updateProduct/${product._id}`}>✏️ Edit</Link>
                    </button>

                    <button
                      className="flex-1 rounded-lg cursor-pointer  bg-gradient-to-r from-red-500 to-pink-600 py-2 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                      onClick={() => deleteProductData(product._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
