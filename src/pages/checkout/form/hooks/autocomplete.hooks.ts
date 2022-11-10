import { useEffect } from 'react';
import axios from 'axios';

import { ICity, IStreet } from '@pages/checkout/form/utils/form.utils';

interface IUseSearchStreet {
  city: ICity | null;
  streetSearch: string;
  setSearchResults: (value: IStreet[] | null) => void;
}

export const useSearchStreet = ({ city, streetSearch, setSearchResults }: IUseSearchStreet) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiFetchParams = 'types=address&limit=5&language=en';

  useEffect(() => {
    if (!streetSearch) {
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      axios
        .get(
          `${apiUrl}${streetSearch}.json?bbox=${city?.bbox}&${apiFetchParams}&access_token=${apiKey}`,
        )
        .then((resp) => {
          if (!resp.data.features[0]) {
            setSearchResults([{ id: '1', text: 'No matches' }]);
          } else {
            setSearchResults(resp.data.features);
          }
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [apiKey, apiUrl, city?.bbox, setSearchResults, streetSearch]);
};
