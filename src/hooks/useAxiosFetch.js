import { useState, useEffect } from "react";
import axios from "axios";

export default function useAxiosFetch(dataUrl) {
  const [data, setData] = useState("");
  const [fetcErr, setFetchErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    async function getData(url) {
      setIsLoading(true);

      try {
        const response = await axios.get(url, { CancelToken: source.token });
        if (isMounted) {
          setData(response.data);
          setFetchErr(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchErr(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    }
    getData(dataUrl);

    function cleanUp() {
      isMounted = false;
      source.cancel();
    }
    return cleanUp();
  }, [dataUrl]);

  return { data, fetcErr, isLoading };
}
