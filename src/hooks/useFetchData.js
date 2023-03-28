import { useState, useEffect } from "react";

const useFetchData = (fetchDataFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataFunction()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [fetchDataFunction]);

  return [data, setData, loading];
};

export default useFetchData;
