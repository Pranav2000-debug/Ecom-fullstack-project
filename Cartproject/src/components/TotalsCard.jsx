import { useEffect } from "react";
import { useCart } from "../context/CartContext";

function TotalsCard() {
  const { cart, totalPrice, price } = useCart();

  useEffect(() => {
    totalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <div className="w-[300px] rounded-lg shadow-md shadow-slate-200 p-4 bg-white sticky top-24 left-0">
      <h1 className="text-3xl font-bold mb-8">Total</h1>
      <div className="flex flex-col gap-1">
        {cart.map((prod) => {
          return (
            <div className="flex justify-between" key={prod.id}>
              <span>
                {prod.name} x{prod.quantity}
              </span>
              <span>Rs. {prod.newPrice * prod.quantity}</span>
            </div>
          );
        })}
      </div>
      <hr className="mt-6" />

      <div className="flex justify-between">
        <span>Total Before Discount </span>
        <span>Rs. {price.oldTotal}</span>
      </div>
      <div className="flex justify-between">
        <span>Total After Discount </span>
        <span>Rs. {price.total}</span>
      </div>
      <button className="mt-4 translate-x-[65%] bg-[#D64045] hover:bg-[#c54347c4] duration-300 text-white font-semibold py-2 px-6 rounded-lg transition" type="button">
        Checkout
      </button>
    </div>
  );
}

export default TotalsCard;
