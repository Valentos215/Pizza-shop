import { useContext, useState, useEffect, memo } from 'react';

import InputMask from 'react-input-mask';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Address from 'pages/checkout/form/Address';
import Store from 'pages/checkout/form/Store';
import DeliverySet from 'pages/checkout/form/deliverySet/DeliverySet';
import Total from 'pages/checkout/form/total/Total';
import Show from 'shared/components/show/Show';
import { CartContext } from 'contexts/cartContext';
import useFetch from 'shared/hooks/useFetch';
import { ERROR_MES, NAME_VALIDATION } from 'constants/index';
import { IDeliveryAdress, IStoreAdress, getOrderList } from 'pages/checkout/form/utils/form.utils';

import s from 'pages/checkout/form/Form.module.scss';

interface IFormProps {
  setCheckoutSuccess: (value: boolean) => void;
}

const validation = Yup.object({
  name: Yup.string()
    .min(2, ERROR_MES.NameShort)
    .max(25, ERROR_MES.NameLong)
    .required(ERROR_MES.NameRequired)
    .matches(NAME_VALIDATION, ERROR_MES.NameValid),
  email: Yup.string()
    .max(25, ERROR_MES.EmailLength)
    .email(ERROR_MES.EmailIncorrect)
    .required(ERROR_MES.EmailRequired),
  phone: Yup.string().required(ERROR_MES.PhoneRequired),
});

const Form = memo(({ setCheckoutSuccess }: IFormProps) => {
  const [delivery, setDelivery] = useState(true);
  const [cart, setCart] = useContext(CartContext);
  const [shouldCheck, setShouldCheck] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<IDeliveryAdress | null>(null);
  const [storeAddress, setStoreAddress] = useState<IStoreAdress | null>(null);
  const { isLoading, response, doFetch } = useFetch('order');

  const addressError = (delivery && !deliveryAddress) || (!delivery && !storeAddress);

  const initialValues = {
    name: '',
    phone: '',
    email: '',
  };

  const onSubmit = (): void => {
    setShouldCheck(true);

    if (!addressError) {
      doFetch({
        method: 'post',
        body: {
          list: getOrderList(cart),
          customer: {
            name: formik.values.name,
            phone: formik.values.phone,
            email: formik.values.email,
            adress: delivery ? deliveryAddress : storeAddress,
          },
        },
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit,
  });

  const { values, touched, errors, isValid, handleBlur, handleChange, handleSubmit } = formik;

  useEffect(() => {
    if (response) {
      setCheckoutSuccess(true);
      setCart([]);
    }
  }, [response, setCart, setCheckoutSuccess]);

  const nameError = (touched.name && errors.name) || errors.name === ERROR_MES.NameLong;
  const emailError = (touched.email && errors.email) || errors.email === ERROR_MES.EmailLength;
  const phoneError = touched.phone && errors.phone;

  return (
    <div className={s.wrapper}>
      <h3>Checkout order</h3>
      <DeliverySet delivery={delivery} setDelivery={setDelivery} />
      <h3>Contacts</h3>
      <form className={s.contacts}>
        <div className={s.contacts__input}>
          <span className={nameError ? s.error : ''}>{nameError ? errors.name : 'Name'}</span>
          <input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            placeholder="George"
            className={nameError ? s.error : ''}
            autoComplete="off"
          />
        </div>
        <div className={s.contacts__input}>
          <span className={phoneError ? s.error : ''}>{phoneError ? errors.phone : 'Phone'}</span>
          <InputMask
            name="phone"
            mask="+38(099) 999 99 99"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+38(0xx) xxx xx xx"
            className={phoneError ? s.error : ''}
          />
        </div>
        <div className={s.contacts__input}>
          <span className={emailError ? s.error : ''}>{emailError ? errors.email : 'E-mail'}</span>
          <input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            placeholder="email@example.com"
            className={emailError ? s.error : ''}
            autoComplete="off"
          />
        </div>
      </form>
      <Show condition={delivery}>
        <Address
          setDeliveryAddress={setDeliveryAddress}
          shouldCheck={shouldCheck}
          setShouldCheck={setShouldCheck}
        />
      </Show>
      <Show condition={!delivery}>
        <Store
          setStoreAddress={setStoreAddress}
          shouldCheck={shouldCheck}
          setShouldCheck={setShouldCheck}
        />
      </Show>
      <textarea name="comment" rows={2} placeholder="Comment" />
      <Total
        isLoading={isLoading}
        addressError={addressError}
        isValid={isValid}
        handleSubmit={handleSubmit}
      />
    </div>
  );
});

export default Form;
