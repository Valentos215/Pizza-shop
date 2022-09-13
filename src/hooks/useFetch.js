import { CurrentUserContext } from "./../contexts/currentUserContext";
import axios from "axios";
import { useEffect, useState, useCallback, useContext } from "react";

type ResponseType = {
  token: string;
  positions: { id: number; name: string }[];
  total_users: number;
  users: {
    id: number;
    photo: string;
    name: string;
    position: string;
    email: string;
    phone: string;
  }[];
};

type Options =
  | {
      method: "get" | "post" | "put" | "delete";
      data: FormData;
    }
  | {};

type Error = { fails: { name: string[] }[]; message: string };

type UseFetchResult = {
  isLoading: boolean;
  response: ResponseType | null;
  error: Error | null;
  doFetch: (options?: Options) => void;
};

const useFetch = (url: string): UseFetchResult => {
  const baseUrl = "https://frontend-test-assignment-api.abz.agency/api/v1/";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [options, setOptions] = useState<Options>({});
  const [token] = useContext(CurrentUserContext);

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipGetResponseAfterDestroy = false;
    const requestOptions = {
      ...options,
      ...{
        headers: {
          Token: token ? token : "",
        },
      },
    };
    if (!isLoading) return;
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
  }, [isLoading, options, url, token]);

  return { isLoading, response, error, doFetch };
};

export default useFetch;
