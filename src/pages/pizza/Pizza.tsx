import { useState, useEffect, useContext, memo } from 'react';

import Filter from 'shared/components/filter/Filter';
import Sort from 'shared/components/sort/Sort';
import PizzaItem from 'shared/components/productItem/PizzaItem';
import useLocalStorage from 'shared/hooks/useLocalStorage';
import useFetch from 'shared/hooks/useFetch';
import PizzaSkeleton from 'shared/components/productItem/PizzaSkeleton';
import Show from 'shared/components/show/Show';
import { ExpandContext } from 'contexts/expandContext';
import { getFilteredIngredients, IPizza, pizzasToShow } from './utils/pizza.utils';
import { mapPizzas, range } from 'utils/utils';

import s from 'pages/pizza/Pizza.module.scss';

const Pizza = memo(() => {
  const [filter, setFilter] = useState<string[] | null>(null);
  const [memInvert, setMemInvert] = useLocalStorage('invert');
  const [invert, setInvert] = useState(Number(memInvert) || 0);
  const [memSort, setMemSort] = useLocalStorage('sort');
  const [sort, setSort] = useState<number>(Number(memSort) || 0);
  const [pizzas, setPizzas] = useState<IPizza[] | null>(null);
  const { isLoading, response, error, doFetch } = useFetch('pizzas');
  const [expanded] = useContext(ExpandContext);

  const sortCriteria = ['Popularity', 'Price low-high', 'Price high-low'];

  const itemsList = pizzasToShow({ pizzas, filter, sort, invert });

  const scrollClassNames = expanded ? 'scroll off' : 'scroll';

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!response) return;
    setPizzas(mapPizzas(response));
  }, [response]);

  useEffect(() => {
    setMemSort(String(sort));
  }, [sort, setMemSort]);

  useEffect(() => {
    setMemInvert(String(Number(invert) * 1));
  }, [invert, setMemInvert]);

  return (
    <div className={scrollClassNames}>
      <div className="container">
        <div className={s.wrapper}>
          <div className={s.filters}>
            <Filter
              specification={getFilteredIngredients(pizzas)}
              setFilter={setFilter}
              invert={invert}
            />
            <Sort sortCriteria={sortCriteria} setSort={setSort} />
          </div>
          <Show condition={!!error}>
            <h2>Something went wrong</h2>
          </Show>
          <Show condition={!!filter}>
            <div className={s.title}>
              Pizzas {!!invert ? 'without' : 'contains'} {filter && filter.join(', ')}{' '}
              <span onClick={() => setInvert(Math.abs(invert - 1))} className={s.invert}>
                Invert
              </span>
            </div>
          </Show>
          <div className={s.pizzaItems}>
            <Show condition={isLoading}>
              {range(8).map((i) => (
                <PizzaSkeleton key={i} />
              ))}
            </Show>
            <Show condition={!!itemsList}>
              {!!itemsList &&
                itemsList.map((pizza: IPizza) => <PizzaItem key={pizza.id} pizza={pizza} />)}
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Pizza;
