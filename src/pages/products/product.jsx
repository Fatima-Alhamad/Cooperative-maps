import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function Product() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get('/products.json');
        const productData = response.data.find((p) => p.id === parseInt(id));
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center text-xl font-semibold text-gray-500">Loading product details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
        
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-green-600">Price: ${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
