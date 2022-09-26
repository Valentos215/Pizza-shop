import s from "./Adress.module.scss";

const Adress = () => {
  return (
    <div className={s.adress}>
      <h3>Adress</h3>
      <form className={s.form}>
        <div className={s.form__row}>
          <input className={s.expand} name="city" placeholder="City"></input>
          <input
            className={s.expand}
            name="street"
            placeholder="Street"
          ></input>
        </div>
        <div className={s.form__row}>
          <input name="house" placeholder="House"></input>
          <input name="apartment" placeholder="Apartment"></input>
          <input name="entrance" placeholder="Entrance"></input>
        </div>
        <textarea name="comment" rows={2} placeholder="Comment"></textarea>
      </form>
    </div>
  );
};

export default Adress;
