import s from "./PizzaItem.module.scss";
import { useState } from "react";
import cartLogo from "../../../assets/Cart.svg";

const PizzaItem = () => {
  const pizza = {
    id: "001",
    img: "https://media.dominos.ua/__sized__/menu/product_osg_image_category/2021/07/27/Manhatten_slice_collageweb-min-thumbnail-960x960-70.jpg",
    title: "Manhattan",
    description: "double serving of mushrooms",
    ingredients: ["Mushrooms, Mozarella, Peperoni, Al'fredo sauce"],
    baseCost: 215,
  };
  const sizes = ["Standard size", "Large", "New Yorker"];
  const crusts = ["Standard crust", "Thin", "Philadelphia", "Hot-Dog Crust"];
  const weight = [560, 750, 810];
  const [currentSize, setCurrentSize] = useState(sizes[0]);
  const [currentCrust, setCurrentCrust] = useState(crusts[0]);
  const [count, setCount] = useState(0);

  const amount = () => {
    const sizeRate = () => {
      if (currentSize === sizes[1]) return 1.18;
      if (currentSize === sizes[2]) return 1.32;
      return 1;
    };
    const crustRate = () => {
      if (currentCrust === crusts[2]) return 1.2;
      if (currentCrust === crusts[3]) return 1.24;
      return 1;
    };
    return Math.ceil(pizza.baseCost * (count || 1) * sizeRate() * crustRate());
  };

  const sizeClick = (size: string) => {
    setCurrentSize(size);
    setCurrentCrust(crusts[0]);
  };
  const crustClick = (crust: string) => {
    if (currentSize !== sizes[2]) {
      setCurrentCrust(crust);
    } else {
      if (crust !== crusts[2] && crust !== crusts[3]) {
        setCurrentCrust(crust);
      }
    }
  };
  const crustClasses = (crust: string) => {
    if (crust === currentCrust) {
      return `${s.crust__checked}`;
    }
    if (currentSize === sizes[2]) {
      if (crust === crusts[2] || crust === crusts[3]) {
        return `${s.crust__disabled}`;
      }
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <img className={s.image__main} src={pizza.img} alt=""></img>
        <img className={s.image__cartLogo} src={cartLogo} alt=""></img>
        <span>
          {currentSize === sizes[0] && weight[0]}
          {currentSize === sizes[1] && weight[1]}
          {currentSize === sizes[2] && weight[2]}g
        </span>
      </div>
      <div className={s.title}>{"Pizza " + pizza.title}</div>
      <div className={s.ingredients}>
        {pizza.description && <span>({pizza.description}), </span>}
        {pizza.ingredients.join(", ")}
      </div>
      <div className={s.size}>
        {sizes.map((size) => (
          <span
            key={size}
            onClick={() => {
              sizeClick(size);
            }}
            className={size === currentSize ? s.size__checked : ""}
          >
            {size}
          </span>
        ))}
      </div>
      <div className={s.crust}>
        {crusts.map((crust) => (
          <span
            key={crust}
            onClick={() => crustClick(crust)}
            className={crustClasses(crust)}
          >
            {crust}
          </span>
        ))}
      </div>
      <div className={s.checkout}>
        <div className={s.checkout__amount}>
          {amount()}
          <span> uah</span>
        </div>
        {!count && (
          <div className={s.checkout__tocartButton} onClick={() => setCount(1)}>
            To cart
          </div>
        )}
        {count > 0 && (
          <div className={s.checkout__count}>
            <div
              onClick={() => setCount(count - 1)}
              className={`${s.checkout__count_button} ${s.minus}`}
            ></div>
            <span>{("0" + count).slice(-2)}</span>
            <div
              onClick={() => {
                if (count < 99) setCount(count + 1);
              }}
              className={`${s.checkout__count_button} ${s.plus}`}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PizzaItem;
