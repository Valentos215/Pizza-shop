export interface IPizza {
  id: number;
  title: string;
  img: string;
  description: string[];
  ingredients: string[];
  baseCost: number;
  popularity: number;
}

interface IPizzasToShowParams {
  pizzas: IPizza[] | null;
  filter: string[] | null;
  sort: number;
  invert: number;
}

type TPizzasToShowResult = IPizza[] | null;

export const pizzasToShow = ({
  pizzas,
  filter,
  sort,
  invert,
}: IPizzasToShowParams): TPizzasToShowResult => {
  if (!pizzas) {
    return null;
  }

  let filtered: IPizza[] = [];
  if (filter) {
    filtered = pizzas.filter((pizza: IPizza) => {
      if (invert) {
        return filter.every((ing) => !pizza.ingredients.includes(ing));
      }
      return filter.some((ing) => pizza.ingredients.includes(ing));
    });
  } else {
    filtered = pizzas;
  }

  if (sort === 0)
    return filtered.sort((a, b) => {
      return b.popularity - a.popularity;
    });

  if (sort === 1)
    return filtered.sort((a, b) => {
      return a.baseCost - b.baseCost;
    });

  if (sort === 2)
    return filtered.sort((a, b) => {
      return b.baseCost - a.baseCost;
    });

  return null;
};
