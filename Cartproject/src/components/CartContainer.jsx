import CartItem from "./CartItem";
import { useCart } from "../context/CartContext";
function CartContainer() {
  const { cart } = useCart();
  return (
    <div className="pt-6 flex flex-col gap-3">
      {cart.map((prod) => {
        return <CartItem key={prod.id} {...prod} />;
      })}
    </div>
  );
}

export default CartContainer;
