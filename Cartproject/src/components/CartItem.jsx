import { useCart } from "../context/CartContext";

function CartItem({ id, name, brand, img, alt, newPrice, oldPrice, discount }) {
  const { addToCart, removeFromCart, removeCompletely, cart } = useCart();

  const itemQuantity = cart.find((item) => item.id === id)?.quantity || 0;

  return (
    <div data-id={id} className="flex bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 sm:min-w-[400px]">
      <img src={img} alt={alt} className="w-48 h-48 object-contain" />
      <div className="flex flex-col justify-between p-5 flex-1">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{brand}</h2>
          <p className="text-gray-600 mt-1 mb-3">{name}</p>
          <div className="flex items-center gap-3">
            <p className="text-lg font-bold text-green-600">Rs. {newPrice}</p>
            <p className="text-sm text-gray-500 line-through">Rs. {oldPrice}</p>
            <p className="text-sm font-semibold text-red-500">{discount}% OFF</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => removeCompletely(id)}
            className="bg-[#D64045] hover:bg-[#c54347c4] duration-300 text-white font-semibold py-2 px-6 rounded-lg transition"
            type="button">
            Remove
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => removeFromCart(id)}
              className="w-8 h-8 flex items-center justify-center border border-red-600 font-bold text-lg rounded-full">
              -
            </button>
            <span className="text-lg font-medium">{itemQuantity}</span>
            <button
              onClick={() => addToCart({ id, name, brand, img, alt, newPrice, oldPrice, discount })}
              className="w-8 h-8 flex items-center justify-center border border-green-600 font-bold text-lg rounded-full">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
