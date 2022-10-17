import React, { useState, useEffect, useContext } from 'react';

import Filter from 'shared/components/filter/Filter';
import Sort from 'shared/components/sort/Sort';
import ProductItem from 'shared/components/productItem/ProductItem';
import useFetch from 'shared/hooks/useFetch';
import ProductSkeleton from 'shared/components/productItem/ProductSkeleton';
import { ExpandContext } from 'contexts/expandContext';
import { IProduct, productsToShow } from 'pages/products/utils/products.utils';

import s from 'pages/products/Products.module.scss';

const Products = React.memo(({ match }: any) => {
  const [filter, setFilter] = useState<string[] | null>(null);
  const [sort, setSort] = useState<number>(-1);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [expanded] = useContext(ExpandContext);
  const { isLoading, response, error, doFetch } = useFetch(match.path.slice(1));

  const sortCriteria = ['Price low-high', 'Price high-low'];
  const skeletons = Array.from({ length: 12 }, (v, k) => k + 1);

  const categories = () => {
    if (!products) {
      return null;
    }

    const arr: string[] = [];

    products.forEach((product) => {
      if (!arr.includes(product.category)) arr.push(product.category);
    });

    return arr;
  };

  const itemsList = productsToShow({ products, filter, sort });

  useEffect(() => {
    setFilter(null);
    setSort(-1);
    setProducts(null);
    doFetch();
  }, [doFetch, match.path]);

  useEffect(() => {
    if (!response) return;
    setProducts(response);
  }, [response]);

  return (
    <div className={expanded ? 'scroll off' : 'scroll'}>
      <div className={'container'}>
        <div className={s.wrapper}>
          <div className={s.filters}>
            {products && products[0].category && (
              <Filter
                title="Category"
                specification={categories()}
                setFilter={setFilter}
                invert={0}
              />
            )}
            <p></p>
            <Sort sortCriteria={sortCriteria} setSort={setSort} />
          </div>
          {error && <h2>Something went wrong</h2>}
          {filter && <div className={s.title}>{filter.join(', ')}</div>}
          <div className={s.pizzaItems}>
            {isLoading && skeletons.map((item) => <ProductSkeleton key={item} />)}
            {itemsList &&
              itemsList.map((product: IProduct) => (
                <ProductItem key={product.id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Products;
