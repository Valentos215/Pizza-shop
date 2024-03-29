import { useState, useEffect, useContext, memo } from 'react';

import Filter from 'shared/components/filter/Filter';
import Sort from 'shared/components/sort/Sort';
import ProductItem from 'shared/components/productItem/ProductItem';
import useFetch from 'shared/hooks/useFetch';
import ProductSkeleton from 'shared/components/productItem/ProductSkeleton';
import { ExpandContext } from 'contexts/expandContext';
import {
  getFilteredCategories,
  IProduct,
  productsToShow,
} from 'pages/products/utils/products.utils';
import { mapProducts, range } from 'utils/utils';
import Show from 'shared/components/show/Show';
import { PRODUCTS_SORT_CRITERIA } from 'constants/index';

import s from 'pages/products/Products.module.scss';

type TProductsProps = { match: { path: string } };

const Products = memo(({ match }: TProductsProps) => {
  const [filter, setFilter] = useState<string[] | null>(null);
  const [sort, setSort] = useState<number>(-1);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [expanded] = useContext(ExpandContext);
  const { isLoading, response, error, doFetch } = useFetch('products/' + match.path.slice(1));

  const itemsList = productsToShow({ products, filter, sort });

  const scrollClassNames = expanded ? 'scroll off' : 'scroll';

  useEffect(() => {
    setFilter(null);
    setSort(-1);
    setProducts(null);
    doFetch();
  }, [doFetch, match.path]);

  useEffect(() => {
    if (response) {
      setProducts(mapProducts(response));
    }
  }, [response]);

  return (
    <div className={scrollClassNames}>
      <div className={'container'}>
        <main className={s.wrapper}>
          <div className={s.filters}>
            <Show condition={!!products && !!products[0].category}>
              <Filter
                title="Category"
                specification={getFilteredCategories(products)}
                setFilter={setFilter}
                invert={0}
              />
            </Show>
            <div className={s.filters__space}></div>
            <Sort sortCriteria={PRODUCTS_SORT_CRITERIA} setSort={setSort} />
          </div>
          <Show condition={!!error}>
            <h2>Something went wrong</h2>
          </Show>
          <Show condition={!!filter}>
            <div className={s.title}>{filter && filter.join(', ')}</div>
          </Show>
          <div className={s.pizzaItems}>
            <Show condition={isLoading}>
              {range(12).map((item) => (
                <ProductSkeleton key={item} />
              ))}
            </Show>
            <Show condition={!!itemsList}>
              {!!itemsList &&
                itemsList.map((product: IProduct) => (
                  <ProductItem key={product.id} product={product} />
                ))}
            </Show>
          </div>
        </main>
      </div>
    </div>
  );
});

export default Products;
