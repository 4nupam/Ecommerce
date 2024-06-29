import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Category() {
  const [cate, setCate] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await fetch(`https://fakestoreapi.com/products/category/${name}`);
        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        let data = await res.json();
        setCate(data);
      } catch (error) {
        alert("Error fetching data");
        console.error(error);
      }
    }
    fetchData();
  }, [name]);

  if (cate.length === 0) {
    return <div>Loading...</div>;
  }

  function cart(e,redirect) {
    console.log(e);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isProductexist = cart.find(item=> item.id === e.id)
    if(isProductexist){
      const updatedCart = cart.map(item=>{
        if(item.id === e.id){
          return{
            ...item,
            quantity:item.quantity+1
          }
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }else{
      localStorage.setItem('cart',JSON.stringify([...cart,{...e, quantity:1}]))
    }
    if(redirect){
      navigate('/cart')
    }
  }

  return (
    <div className="container mx-auto px-4">
      <ul>
        {cate.map((e) => (
          <section key={e.id} className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">{e.id}</h2>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">{e.category}</h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{e.title}</h1>
                  <p className="leading-relaxed mb-4">{e.description}</p>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Reviews</span>
                    <span className="ml-auto text-gray-900">{e.rating.rate}/5</span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Size</span>
                    <span className="ml-auto text-gray-900">Medium</span>
                  </div>
                  <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                    <span className="text-gray-500">Quantity</span>
                    <span className="ml-auto text-gray-900">4</span>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-green-500">${e.price}</span>
                    <button
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 
                      focus:outline-none hover:bg-indigo-600 rounded"
                      onClick={() => cart(e,true)}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
                <img
                  alt="ecommerce"
                  className="lg:w-1/5 w-full lg:h-auto h-64 object-contain object-center rounded"
                  src={e.image}
                />
              </div>
            </div>
          </section>
        ))}
      </ul>
    </div>
  );
}

export default Category;
