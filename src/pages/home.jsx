import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/products.json");
        setProducts(response.data); // Set the fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto bg-gray-100 min-h-screen">
      <NavBar />
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg mb-8">Discover amazing products and shop now!</p>
        <a
          href="/products"
          className="bg-green-500 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Shop Now
        </a>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Featured Products
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Explore some of our best-selling products.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length === 0 ? (
            <p className="text-gray-600">No products available.</p>
          ) : (
            products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className=" bg-white p-6 rounded-lg shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-lg font-semibold text-green-600">
                  ${product.price}
                </p>
                <div className="w-full flex justify-center my-4  ">
                  <Link className="bg-green-500 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300"
                    to={`/products/${product.id}`}
                    
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-800 text-white text-center py-20">
        <h2 className="text-3xl font-semibold mb-4">Join Us Today!</h2>
        <p className="text-lg mb-8">
          Sign up for exclusive offers and updates.
        </p>
        <a
          href="/signup"
          className="bg-green-500 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Sign Up Now
        </a>
      </section>
    </div>
  );
}

export default Home;
