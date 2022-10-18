import { useContext, useState, useEffect, memo } from 'react';

import deliveryLogo from 'assets/Delivery.svg';
import carryOutLogo from 'assets/CarryOut.svg';
import Adress from 'pages/checkout/form/Adress';
import { CartContext } from 'contexts/cartContext';
import { totalAmount } from 'utils/utils';
import Store from 'pages/checkout/form/Store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import useFetch from 'shared/hooks/useFetch';
import Preloader from 'shared/components/preloader/Preloader';
import Show from 'shared/components/show/Show';
import { ERROR_MES, NAME_VALIDATION } from 'constants/index';
import { IDeliveryAdress, IStoreAdress } from 'pages/checkout/form/utils/form.utils';

import s from './Form.module.scss';
interface IFormProps {
  setCheckoutSuccess: (value: boolean) => void;
}

const Form = memo(({ setCheckoutSuccess }: IFormProps) => {
  const [delivery, setDelivery] = useState(true);
  const [cart, setCart] = useContext(CartContext);
  const [check, setCheck] = useState(false);
  const [deliveryAdress, setDeliveryAdress] = useState<IDeliveryAdress | null>(null);
  const [storeAdress, setStoreAdress] = useState<IStoreAdress | null>(null);
  const { isLoading, response, doFetch } = useFetch('pizza');

  const adressError = (delivery && !deliveryAdress) || (!delivery && !storeAdress);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, ERROR_MES.nameShort)
        .max(25, ERROR_MES.nameLong)
        .required(ERROR_MES.nameRequired)
        .matches(NAME_VALIDATION, ERROR_MES.nameValid),
      email: Yup.string()
        .max(25, ERROR_MES.emailLength)
        .email(ERROR_MES.emailIncorrect)
        .required(ERROR_MES.emailRequired),
      phone: Yup.string().required(ERROR_MES.phoneRequired),
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

  const nameError =
    (formik.touched.name && formik.errors.name) || formik.errors.name === ERROR_MES.nameLong;
  const emailError =
    (formik.touched.email && formik.errors.email) || formik.errors.email === ERROR_MES.emailLength;
  const phoneError = formik.touched.phone && formik.errors.phone;

  const deliveryClassName = delivery ? `${s.delivery__item} ${s.active}` : s.delivery__item;
  const cerryOutClassName = delivery ? s.delivery__item : `${s.delivery__item} ${s.active}`;
  const buttonClassName = adressError || !formik.isValid ? `${s.button} ${s.disabled}` : s.button;

  return (
    <div className={s.wrapper}>
      <h3>Checkout order</h3>
      <div className={s.delivery}>
        <div className={deliveryClassName} onClick={() => setDelivery(true)}>
          <img src={deliveryLogo} alt="" />
          <span>Delivery</span>
        </div>
        <div className={cerryOutClassName} onClick={() => setDelivery(false)}>
          <img src={carryOutLogo} alt="" />
          <span>Cerry out</span>
        </div>
      </div>
      <h3>Contacts</h3>
      <form className={s.contacts}>
        <div className={s.contacts__input}>
          <span className={nameError ? s.error : ''}>
            {nameError ? formik.errors.name : 'Name'}
          </span>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            placeholder="George"
            className={nameError ? s.error : ''}
            autoComplete="off"
          ></input>
        </div>
        <div className={s.contacts__input}>
          <span className={phoneError ? s.error : ''}>
            {phoneError ? formik.errors.phone : 'Phone'}
          </span>
          <InputMask
            name="phone"
            mask="+38(099) 999 99 99"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="+38(0xx) xxx xx xx"
            className={phoneError ? s.error : ''}
          ></InputMask>
        </div>
        <div className={s.contacts__input}>
          <span className={emailError ? s.error : ''}>
            {emailError ? formik.errors.email : 'E-mail'}
          </span>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            placeholder="email@example.com"
            className={emailError ? s.error : ''}
            autoComplete="off"
          ></input>
        </div>
      </form>
      <Show condition={delivery}>
        <Adress setDeliveryAdress={setDeliveryAdress} check={check} setCheck={setCheck} />
      </Show>
      <Show condition={!delivery}>
        <Store setStoreAdress={setStoreAdress} check={check} setCheck={setCheck} />
      </Show>
      <textarea name="comment" rows={2} placeholder="Comment"></textarea>
      <div className={s.total}>
        <Show condition={isLoading}>
          <div className={s.preloader}>
            <Preloader />
          </div>
        </Show>
        <h3>Total</h3>
        <p>
          {totalAmount(cart)}.00<span> uah</span>
        </p>
        <div className={buttonClassName} onClick={() => formik.handleSubmit()}>
          Checkout
        </div>
      </div>
    </div>
  );
});

export default Form;
