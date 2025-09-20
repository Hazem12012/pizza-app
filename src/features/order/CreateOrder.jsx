import { useState } from 'react';
import { Link, Form, redirect, useActionData } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { useNavigation } from 'react-router-dom';
import Button from '../../UI/Button';
import { FaLocationDot } from 'react-icons/fa6';

import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  getTotalCart,
  getTotalCartPrice,
} from './../cart/cartSlice';
import EmptyCart from './../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from './../../utilities/helpers';
import { fetchAddress } from '../user/userSlice';
import OrderItem from './OrderItem';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const cart = useSelector(getTotalCart);
  const [withPriority, setWithPriority] = useState(false);

  const inputStyles =
    'mb-5 flex gap-2 flex-col sm:flex-row sm:items-center w-full';
  const navigation = useNavigation();

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const totalCartPrice = useSelector(getTotalCartPrice);

  const priorityPrioce = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrioce;

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className={inputStyles}>
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="customer"
              required
              defaultValue={username}
            />
          </div>
        </div>

        <div className={inputStyles}>
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 w-fit rounded-md bg-red-100 px-4 py-0.5 text-xs text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className={`${inputStyles} relative`}>
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              placeholder="Address"
              name="address"
              required
              className="input"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === 'error' && (
              <p className="mt-2 bg-red-100 px-3 py-0.5 text-start text-xs text-red-600">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="tablet-range:top-[3px] absolute top-[35px] right-[5px] z-50 sm:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                style="flex items-center gap-2 align-middle justify-center"
                type={'small'}
                onClick={(e) => {
                  dispatch(fetchAddress());
                  e.preventDefault();
                }}
              >
                Get position <FaLocationDot className="text-sm" />
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-5 w-5 border-0 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <input
            type="hidden"
            value={
              position.latitude && position.longitude
                ? `${position.latitude} , ${position.longitude}`
                : ''
            }
            name="posation"
          />

          <Button
            type="primary"
            disabled={navigation.state !== 'idle' ? true : false}
          >
            {navigation.state === 'idle'
              ? `Order now ${formatCurrency(totalPrice)}`
              : `Placing order...`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = {};
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  if (!isValidPhone(order.phone)) {
    errors.phone =
      'please give us your correct phone number, We might need it to call you.';
  }

  
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
  
}
export default CreateOrder;
