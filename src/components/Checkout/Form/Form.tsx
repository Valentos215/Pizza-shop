import { useContext, useState, useEffect } from "react";
import s from "./Form.module.scss";
import deliveryLogo from "../../../assets/Delivery.svg";
import carryOutLogo from "../../../assets/CarryOut.svg";
import Adress from "./Adress";
import { CartContext } from "../../../contexts/cartContext";
import { totalAmount } from "../../../utils/utils";
import Store from "./Store";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import useFetch from "../../../hooks/useFetch";
import Preloader from "../../sharedComponents/Preloader/Preloader";
import { errorMes, nameValidation } from "../../../utils/constants";

type StoreAdress = { city: string; store: string };
type DeliveryAdress = {
  city: string;
  street: string;
  house: string;
  apartment?: string;
  entrance?: string;
};
type FormProps = {
  setCheckoutSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = ({ setCheckoutSuccess }: FormProps) => {
  const [delivery, setDelivery] = useState(true);
  const [cart, setCart] = useContext(CartContext);
  const [check, setCheck] = useState(false);
  const [deliveryAdress, setDeliveryAdress] = useState<DeliveryAdress | null>(
    null
  );
  const [storeAdress, setStoreAdress] = useState<StoreAdress | null>(null);
  const { isLoading, response, doFetch } = useFetch("pizza");

  const adressError =
    (delivery && !deliveryAdress) || (!delivery && !storeAdress);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, errorMes.nameShort)
        .max(25, errorMes.nameLong)
        .required(errorMes.nameRequired)
        .matches(nameValidation, errorMes.nameValid),
      email: Yup.string()
        .max(25, errorMes.emailLength)
        .email(errorMes.emailIncorrect)
        .required(errorMes.emailRequired),
      phone: Yup.string().required(errorMes.phoneRequired),
    }),
    onSubmit: (values) => {
      if (isLoading) {
        return;
      }
      setCheck(true);
      if (!adressError) {
        doFetch();
      }
    },
  });

  useEffect(() => {
    if (!response) return;
    setCheckoutSuccess(true);
    setCart([]);
  }, [response]);

  const disabled = adressError || !formik.isValid;

  const nameError =
    (formik.touched.name && formik.errors.name) ||
    formik.errors.name === errorMes.nameLong;
  const emailError =
    (formik.touched.email && formik.errors.email) ||
    formik.errors.email === errorMes.emailLength;
  const phoneError = formik.touched.phone && formik.errors.phone;

  return (
    <div className={s.wrapper}>
      <h3>Checkout order</h3>
      <div className={s.delivery}>
        <div
          className={
            delivery ? `${s.delivery__item} ${s.active}` : s.delivery__item
          }
          onClick={() => setDelivery(true)}
        >
          <img src={deliveryLogo} alt=""></img>
          <span>Delivery</span>
        </div>
        <div
          className={
            delivery ? s.delivery__item : `${s.delivery__item} ${s.active}`
          }
          onClick={() => setDelivery(false)}
        >
          <img src={carryOutLogo} alt=""></img>
          <span>Cerry out</span>
        </div>
      </div>
      <h3>Contacts</h3>
      <form className={s.contacts}>
        <div className={s.contacts__input}>
          <span className={nameError ? s.error : ""}>
            {nameError ? formik.errors.name : "Name"}
          </span>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            placeholder="First name"
            className={nameError ? s.error : ""}
            autoComplete="off"
          ></input>
        </div>
        <div className={s.contacts__input}>
          <span className={phoneError ? s.error : ""}>
            {phoneError ? formik.errors.phone : "Phone"}
          </span>
          <InputMask
            name="phone"
            mask="+38(099) 999 99 99"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Phone"
            className={phoneError ? s.error : ""}
          ></InputMask>
        </div>
        <div className={s.contacts__input}>
          <span className={emailError ? s.error : ""}>
            {emailError ? formik.errors.email : "E-mail"}
          </span>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            placeholder="E-mail"
            className={emailError ? s.error : ""}
            autoComplete="off"
          ></input>
        </div>
      </form>
      {delivery && (
        <Adress
          setDeliveryAdress={setDeliveryAdress}
          check={check}
          setCheck={setCheck}
        />
      )}
      {!delivery && (
        <Store
          setStoreAdress={setStoreAdress}
          check={check}
          setCheck={setCheck}
        />
      )}
      <textarea name="comment" rows={2} placeholder="Comment"></textarea>
      <div className={s.total}>
        {isLoading && (
          <div className={s.preloader}>
            <Preloader />
          </div>
        )}
        <h3>Total</h3>
        <p>
          {totalAmount(cart)}.00<span> uah</span>
        </p>
        <div
          className={disabled ? `${s.button} ${s.disabled}` : s.button}
          onClick={() => formik.handleSubmit()}
        >
          Checkout
        </div>
      </div>
    </div>
  );
};

export default Form;
