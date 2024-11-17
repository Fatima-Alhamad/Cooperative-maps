import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/navBar";
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Fetch data from the local JSON file in the public folder
        const response = await axios.get("/products.json");

        // Set the fetched data into state
        setProducts(response.data);
      } catch (error) {
        // Handle error (e.g., if the file is not found)
        setError("Error fetching products.");
        console.error("Error fetching products:", error);
      } finally {
        // Set loading to false after data fetch
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <p className="text-xl text-center font-semibold text-gray-500">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-xl text-center font-semibold text-red-500">{error}</p>
    );
  }

  return (
    <div className="container mx-auto ">
      <NavBar />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-xl text-gray-500">
            No products available.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-green-600">
                Price: ${product.price}
              </p>
              <Link
                to={`/products/${product.id}`}
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
