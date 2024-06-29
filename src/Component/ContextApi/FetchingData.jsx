import React, { useContext, createContext, useState, useEffect } from "react";

const DataContext = createContext();

export const FetchingData = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
    <DataContext.Provider value={{ data, loading, error }}>
        {children}
    </DataContext.Provider>
    </>
  );
};
export const useData = () => {
    return useContext(DataContext);
  };
