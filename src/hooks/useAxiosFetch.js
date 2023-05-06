import { useState, useEffect } from 'react';
import axios from 'axios';
const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchErr, setFetchErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   let isMounted = true;
  //   const source = axios.CancelToken.source();

  //   const fetchData = async (url) => {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get(url, {
  //         cancelToken: source.token,
  //       });
  //       if (isMounted) {
  //         setData(response.data);
  //         setFetchErr(null);
  //       }
  //     } catch (err) {
  //       if (isMounted) {
  //         setData([]);
  //         setFetchErr(err.message);
  //       }
  //     } finally {
  //       isMounted && setIsLoading(false);
  //     }
  //   };

  //   fetchData(dataUrl);

  //   const cleanUp = () => {
  //     isMounted = false;
  //     source.cancel();
  //   };

  //   return cleanUp;
  // }, dataUrl);

  const refrech = () => {
    setIsLoading(true);
    axios
      .get(dataUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setFetchErr(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refrech();
  }, [dataUrl]);

  return { data, fetchErr, isLoading, refrech };
};

export default useAxiosFetch;
