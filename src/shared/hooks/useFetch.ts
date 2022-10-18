import { useEffect, useState, useCallback } from 'react';

import axios from 'axios';

type RespType = {
  id: number;
  title: string;
  img: string;
  baseCost: number;
  cost: number[];
  popularity: number;
  size: string[];
  category: string;
  weight: number[];
  description: string[];
  ingredients: string[];
}[];

type Options =
  | {
      method: 'get' | 'post' | 'put' | 'delete';
      data: FormData;
    }
  | {};

type Error = { fails: { name: string[] }[]; message: string };

type UseFetchResult = {
  isLoading: boolean;
  response: RespType | null;
  error: Error | null;
  doFetch: (options?: Options) => void;
};

const useFetch = (url: string): UseFetchResult => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<RespType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [options, setOptions] = useState<Options>({});

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipGetResponseAfterDestroy = false;
    const requestOptions = options;
    if (!isLoading) {
      return;
    }
    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipGetResponseAfterDestroy) {
          setIsLoading(false);
          setResponse(res.data);
        }
      })
      .catch((error) => {
        if (!skipGetResponseAfterDestroy) {
          setIsLoading(false);
          setError(error.response.data);
        }
      });

    return () => {
      skipGetResponseAfterDestroy = true;
    };
  }, [baseUrl, isLoading, options, url]);

  return { isLoading, response, error, doFetch };
};

export default useFetch;
