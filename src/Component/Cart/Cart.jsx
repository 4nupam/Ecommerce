import React, { useState, useEffect } from "react";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (!cart.length) {
    return <div className="text-center py-10 text-gray-500">Cart is Empty</div>;
  }
 
  return (
    <div className="p-4 my-5 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        Shopping Cart ({cart.length} items)
      </h2>
      <ul>
        {cart.map((e, index) => {
          return (
            <li key={index} className="mb-4 border-b pb-4">
              <div className="flex justify-between items-center">
                <img
                  src={e.image}
                  alt={e.title}
                  className="h-40 w-36 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{e.title}</h3>
                  <p className="text-xl font-bold text-gray-700">${e.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQuantity(index)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="mx-2">{e.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(index)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  aria-label="Remove"
                  onClick={() => removeItem(index)}
                >
                  ✕
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="text-right mt-4">
        <h3 className="text-xl font-bold">Total: ${calculateTotal()}</h3>
        <button
          className="bg-yellow-500 text-white p-2 rounded-full hover:bg-red-600"
          onClick={()=>alert("Bought")}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}

export default Cart;
