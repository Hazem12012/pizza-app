import { useState } from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { useNavigation } from 'react-router-dom';
import Button from '../../UI/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const inputStyles =
    'mb-5 flex gap-2 flex-col sm:flex-row sm:items-center w-full';
  const navigation = useNavigation();

  const formErrors = useActionData();
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className={inputStyles}>
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input className="input" type="text" name="customer" required />
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

        <div className={inputStyles}>
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required className="input" />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-5 w-5 border-0 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <Button
            type="primary"
            disabled={navigation.state !== 'idle' ? true : false}
          >
            {navigation.state === 'idle' ? `Order now` : `Placing order...`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on' ? true : false,
  };
  const newOrder = await createOrder(order);

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      'please give us your correct phone number, We might need it to call you.';
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
