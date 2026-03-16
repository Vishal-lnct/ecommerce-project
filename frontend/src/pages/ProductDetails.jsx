import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {

    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

  }, [id, BASEURL]);


  useEffect(() => {

    const exists = wishlistItems.some(
      item => item.product.id === Number(id)
    );

    setIsWishlisted(exists);

  }, [wishlistItems, id]);


  const handleAddToCart = () => {

    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    addToCart(product.id);
  };


  const toggleWishlist = async () => {

    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (isWishlisted) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product.id);
    }

  };


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading product...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found
      </div>
    );


  return (

    <div className="min-h-screen bg-gray-50 py-16 px-6">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">

        <div className="grid md:grid-cols-2 gap-14">

          {/* PRODUCT IMAGE */}

          <div className="bg-gray-100 rounded-xl flex items-center justify-center p-6">

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[420px] object-contain hover:scale-105 transition duration-300"
            />

          </div>


          {/* PRODUCT INFO */}

          <div className="flex flex-col justify-center">

            {/* TITLE */}
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className="bg-green-600 text-white px-2 py-1 rounded">
                4.3 ★
              </span>
              <span className="text-gray-500">
                1,200 ratings
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3 mb-6">

              <p className="text-3xl font-bold text-green-600">
                ₹{product.price}
              </p>

              <span className="line-through text-gray-400">
                ₹{Math.round(product.price * 1.2)}
              </span>

              <span className="text-green-600 font-medium">
                20% OFF
              </span>

            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>


            {/* ACTION BUTTONS */}

            <div className="flex gap-4 mb-6">

              <button
                onClick={handleAddToCart}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition"
              >
                Add to Cart 🛒
              </button>

              <button
                onClick={toggleWishlist}
                className={`px-8 py-3 rounded-lg font-semibold shadow-md transition ${
                  isWishlisted
                    ? "bg-pink-500 hover:bg-pink-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                {isWishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
              </button>

            </div>


            {/* DELIVERY INFO */}

            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600 mb-6">

              🚚 Free delivery within 3–5 days  
              <br />
              🔄 Easy 7-day returns  
              <br />
              💳 Cash on delivery available

            </div>


            {/* BACK BUTTON */}

            <Link
              to="/"
              className="text-purple-600 font-medium hover:underline"
            >
              ← Back to products
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProductDetails;