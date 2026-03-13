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


  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  if (!product) return <div className="text-center mt-10">No product found</div>;


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-16 px-6">

      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-5xl w-full">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* PRODUCT IMAGE */}
          <div className="overflow-hidden rounded-2xl shadow-md group">

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[420px] object-cover transition-transform duration-300 group-hover:scale-105"
            />

          </div>


          {/* PRODUCT DETAILS */}
          <div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <p className="text-gray-500 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            <p className="text-3xl font-bold text-green-600 mb-8">
              ₹{product.price}
            </p>

            <div className="flex flex-wrap gap-4">

              {/* ADD TO CART */}
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
              >
                Add to Cart 🛒
              </button>

              {/* WISHLIST BUTTON */}
              <button
                onClick={toggleWishlist}
                className={`px-8 py-3 rounded-xl font-semibold shadow-md transition ${
                  isWishlisted
                    ? "bg-pink-500 hover:bg-pink-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                {isWishlisted ? "❤️ Wishlisted" : "🤍 Add to Wishlist"}
              </button>

            </div>

            {/* BACK LINK */}
            <div className="mt-8">
              <Link
                to="/"
                className="text-blue-600 font-medium hover:underline"
              >
                ← Back to Home
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;