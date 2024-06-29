import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";


function Filter() {
  const [catdata, setCatdata] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    async function fetching() {
      try {
        let res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) {
          console.log("error");
        } else {
          let ans = await res.json();
          console.log(ans);
          setCatdata(ans);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetching();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-3xl font-bold text-center mb-8">Browse By Categories</h2>
    <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      {catdata && catdata.map((e, index) => (
        <li key={index}>
          <div className="max-w-sm mx-auto bg-gradient-to-r from-blue-200 to-pink-300 rounded-xl  shadow-lg overflow-hidden
           cursor-pointer transform transition duration-500 hover:scale-105"   onClick={() => navigate(`/Category/${e}`)}>
            <div className="md:flex">
              <div className="p-8">
                <h2 className="block mt-1 text-lg leading-tight font-medium text-slate-800">{e}</h2>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  
  
  );
}

export default Filter;
