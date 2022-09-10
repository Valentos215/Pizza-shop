import s from "./PizzaItem.module.scss";
import { useState } from "react";
import cartLogo from "../../../assets/Cart.svg";

const PizzaItem = () => {
  const imageUrl =
    "https://media.dominos.ua/__sized__/menu/product_osg_image_category/2021/07/27/Manhatten_slice_collageweb-min-thumbnail-960x960-70.jpg";

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
  const [currentSize, setCurrentSize] = useState("Standard size");
  const [currentCrust, setCurrentCrust] = useState("Standard crust");
  const [count, setCount] = useState(0);

  const amount = () => {
    const sizeRate = () => {
      if (currentSize === "Large") return 1.18;
      if (currentSize === "New Yorker") return 1.32;
      return 1;
    };
    const crustRate = () => {
      if (currentCrust === "Philadelphia") return 1.2;
      if (currentCrust === "Hot-Dog Crust") return 1.24;
      return 1;
    };
    return pizza.baseCost * (count || 1) * sizeRate() * crustRate();
  };

  const crustClick = (crust: string) => {
    if (currentSize !== "New Yorker") {
      setCurrentCrust(crust);
    } else {
      if (crust !== "Philadelphia" || "Hot-Dog Crust") {
        setCurrentCrust(crust);
      }
    }
  };
  const crustClasses = (crust: string) => {
    if (crust === currentCrust) {
      return `${s.checked}`;
    }
    if (currentSize !== "New Yorker") {
      if (crust === "Philadelphia" || "Hot-Dog Crust") {
        return `${s.disabled}`;
      }
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <img className={s.mainImage} src={pizza.img} alt=""></img>
        <img className={s.cartLogo} src={cartLogo} alt=""></img>
        <span>
          {currentSize === "Standard size" && "560g"}
          {currentSize === "Large" && "750g"}
          {currentSize === "New Yorker" && "810g"}
        </span>
      </div>
      <div className={s.title}>{"Pizza " + pizza.title}</div>
      <div className={s.ingredients}>
        {pizza.description && <span>{pizza.description}, </span>}
        {pizza.ingredients.join(", ")}
      </div>
      <div className={s.sizes}>
        {sizes.map((size) => (
          <span
            onClick={() => {
              setCurrentSize(size);
            }}
            className={size === currentSize ? s.checked : ""}
          >
            {size}
          </span>
        ))}
      </div>
      <div className={s.crusts}>
        {crusts.map((crust) => (
          <span
            onClick={() => crustClick(crust)}
            className={crustClasses(crust)}
          >
            {crust}
          </span>
        ))}
      </div>
      <div className={s.checkout}>
        <div className={s.amount}>{amount()}</div>
        {!count && <div className={s.tocard}></div>}
        {count && (
          <div className={s.counter}>
            <div onClick={() => setCount(count - 1)} className={s.button}></div>
            <span>{("0" + count).slice(-2)}</span>
            <div
              onClick={() => {
                if (count < 99) setCount(count + 1);
              }}
              className={s.button}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PizzaItem;
