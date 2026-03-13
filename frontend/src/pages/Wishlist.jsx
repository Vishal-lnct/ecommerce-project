import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {

  const navigate = useNavigate();

  const { wishlistItems, fetchWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {

    // const token = localStorage.getItem("access_token");

    // if (!token) {
    //   navigate("/login");
    //   return;
    // }

    fetchWishlist();

  }, [navigate]);


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-10">
          ❤️ My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (

          <p className="text-gray-500">No products in wishlist</p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {wishlistItems.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4"
              >

                {/* IMAGE */}
                <div className="overflow-hidden rounded-lg">

                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
                  />

                </div>

                {/* NAME */}
                <h2 className="text-md font-semibold text-gray-800 mt-3 line-clamp-1">
                  {item.product.name}
                </h2>

                {/* PRICE */}
                <p className="text-green-600 font-bold mt-1">
                  ₹{item.product.price}
                </p>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => removeFromWishlist(item.product.id)}
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Wishlist;