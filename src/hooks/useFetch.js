import { useState } from 'react';
//
function useFetch() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const newError = await data.json();
        throw new Error(newError.message);
      }
      const req = await res.json();
      return req.results;
    } catch (e) {
      setError(e);
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };
  return { fetchData, loading, error };
}

export default useFetch;
