import { useContext, useState } from "react";
import s from "./Form.module.scss";
import deliveryLogo from "../../../assets/Delivery.svg";
import carryOutLogo from "../../../assets/CarryOut.svg";
import Adress from "./Adress";
import { CartContext } from "../../../contexts/cartContext";
import { totalAmount } from "../../../utils";
import Store from "./Store";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";

const Form = () => {
  const [delivery, setDelivery] = useState(true);
  const [cart] = useContext(CartContext);
  const [check, setCheck] = useState(false);
  const [deliveryAdress, setDeliveryAdress] = useState();
  const [storeAdress, setStoreAdress] = useState<{
    city: string;
    store: string;
  } | null>(null);

  const errorMes = {
    nameLength: "Name length 2-25 letters",
    nameRequired: "Name is required",
    emailLength: "25 characters or less",
    emailRequired: "Email is required",
    emailIncorrect: "Incorrect email",
    phoneRequired: "Phone number is required",
  };

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
        .min(2, errorMes.nameLength)
        .max(25, errorMes.nameLength)
        .required(errorMes.nameRequired),
      email: Yup.string()
        .max(25, errorMes.emailLength)
        .email(errorMes.emailIncorrect)
        .required(errorMes.emailRequired),
      phone: Yup.string().required(errorMes.phoneRequired),
    }),
    onSubmit: (values) => {
      setCheck(true);
      if (!adressError) console.log(values);
    },
  });

  const disabled = adressError || !formik.isValid;

  let nameError =
    (formik.touched.name && formik.errors.name) ||
    formik.errors.name === errorMes.nameLength;
  let emailError =
    (formik.touched.email && formik.errors.email) ||
    formik.errors.email === errorMes.emailLength;
  let phoneError = formik.touched.phone && formik.errors.phone;

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
          <span>{nameError && formik.errors.name}</span>
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
          <span>{phoneError && formik.errors.phone}</span>
          <InputMask
            name="phone"
            mask="+38(099) 999 99 99"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Phone"
            className={phoneError ? s.error : ""}
          ></InputMask>
          {/* <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
            placeholder="Phone"
            className={phoneError ? s.error : ""}
            autoComplete="off"
          ></input> */}
        </div>
        <div className={s.contacts__input}>
          <span>{emailError && formik.errors.email}</span>
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
      {delivery && <Adress />}
      {!delivery && (
        <Store
          setStoreAdress={setStoreAdress}
          check={check}
          setCheck={setCheck}
        />
      )}
      <textarea name="comment" rows={2} placeholder="Comment"></textarea>
      <div className={s.total}>
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
