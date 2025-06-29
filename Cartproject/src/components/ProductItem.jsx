import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductItem({ id, name, brand, img, alt, newPrice, oldPrice, discount, rating }) {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  // Checks if the current component we are looking at/rendering is in the cart or not by using .some
  // We can also use useNavigate to programmatically navigate to a certain part, useNavigate allows us to go to a new route (like /cart) when a condition is met, without using a <Link> tag.
  const inCart = cart.some((item) => item.id === id)
  

  function handleClick() {
    if (inCart) {
      navigate("/cart");
    } else {
      addToCart({ id, name, brand, img, alt, newPrice, oldPrice, discount, rating });
    }
  }

  return (
    <div data-id={id} className="w-[90%] sm:w-[14.3rem] lg:w-[18rem] shadow-xl bg-white rounded-lg px-4 space-y-2 pb-3">
      <div className="w-full h-[240px]">
        <img className="h-full object-contain mx-auto" src={img} alt={alt} />
      </div>
      <div className="">
        <div className="text-xl font-semibold">{brand}</div>
        <div className="mb-2">
          <p className="text-sm">{name}</p>
          <p className="flex gap-2 text-sm font-semibold text-green-600">
            Rs.{newPrice}
            <span  className="line-through text-gray-500">Rs.{oldPrice}</span>
            <span className="text-red-500">({discount}% OFF)</span>
          </p>
          <p>
            <span className="text-sm">{rating}</span>
            {/* Star Icon Here */}
            {/* Heart Icon Here */}
          </p>
        </div>
        <div>
          <button
            onClick={handleClick}
            className="text-center w-full bg-[#D64045] hover:bg-[#c54347c4] duration-300 px-3 py-1 rounded-md text-white font-semibold"
            data-id={id}>
            {inCart ? "Go To Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
