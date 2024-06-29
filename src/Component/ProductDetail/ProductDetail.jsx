import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router";

function ProductDetail() {
  const [pd, setPd] = useState({});
  const { id } = useParams();
  //   console.log(id, "id");
  const navigate = useNavigate()
  useEffect(() => {
    async function fetching() {
      try {
        let res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await res.json();
        console.log("API Response:", data); // Log the response data
        setPd(data); // Set state with fetched data
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Error fetching data"); // Display an alert for the user or handle the error appropriately
      }
    }

    fetching(); // Call the async function
  }, []);


  function cart(pd,redirect) {
    console.log(pd);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isProductexist = cart.find(item=> item.id === pd.id)
    if(isProductexist){
      const updatedCart = cart.map(item=>{
        if(item.id === pd.id){
          return{
            ...item,
            quantity:item.quantity+1
          }
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }else{
      localStorage.setItem('cart',JSON.stringify([...cart,{...pd, quantity:1}]))
    }
    if(redirect){
      navigate('/cart')
    }
  }

  !Object.keys(pd).length > 0 && <div>Not Found</div>;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      {Object.keys(pd).length > 0 ? (
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="Product"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={pd.image ? pd.image : "https://dummyimage.com/400x400"}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {pd.id} {pd.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {pd.title}
              </h1>
              <div className="flex mb-4">
                {/* Star ratings and other icons */}
              </div>
              <p className="leading-relaxed">{pd.description}</p>
              <div className="flex mt-6 items-center gap-6 pb-5 border-b-2 border-gray-100 mb-5">
                {pd.rating.rate} Star <br />
                {pd.rating.count} Reviews
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-green-400">
                  ${pd.price}
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2
                 px-6 focus:outline-none hover:bg-indigo-600 rounded"  onClick={() => cart(pd,true)}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto">
            <div className="flex flex-wrap -m-4">
              <div className="p-4 mx-auto">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <h2 className="text-lg font-medium title-font text-gray-900 text-center pt-10">
                    Product Not Found
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetail;
