import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        let res = await fetch("https://fakestoreapi.com/products?limit=8");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await res.json();
        // Initialize visibility state for each product
        const productsWithVisibility = data.map(product => ({
          ...product,
          showDescription: false
        }));
        setProducts(productsWithVisibility);
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
    fetchProducts();
  }, []);

  const toggleDescription = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, showDescription: !product.showDescription } : product
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products && products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden">
            <img
              className="w-full h-64 object-contain"
              src={product.image}
              alt={product.title}
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-medium text-gray-400">{product.id} {product.category}</h2>
                <h2 className="text-green-500 font-semibold">${product.price}</h2>
              </div>
              <h1 className="text-lg font-medium text-gray-900 mb-2">{product.title}</h1>
              <p className={`text-gray-600 mb-4 ${product.showDescription ? 'block' : 'hidden'}`}>{product.description}</p>
              <button
                className="text-indigo-500 inline-flex items-center"
                onClick={() => toggleDescription(product.id)}
              >
                {product.showDescription ? 'Hide Description' : 'Show Description'}
                <svg
                  className={`w-4 h-4 ml-2 transform ${product.showDescription ? 'rotate-180' : 'rotate-0'}`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <div className="flex items-center justify-between mt-2">
                <button
                  className="text-indigo-500 inline-flex items-center"
                  onClick={() => navigate(`/ProductDetail/${product.id}`)}
                >
                  View Details
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <span className="text-gray-400 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {product.rating.rate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
