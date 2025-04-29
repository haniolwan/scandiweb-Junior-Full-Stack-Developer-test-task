import classNames from "classnames";
import { Product } from "../../../helpers/types";
import { CartIcon } from "../../icons";
import { Link } from "react-router";

type Props = {
  product: Product;
};

const Card = ({ product }: Props) => {
  const InStockOverlay = () => {
    return (
      <>
        {product.inStock && (
          <div className="hover:scale-105 opacity-0 group-hover:opacity-100 absolute bottom-14 right-6 bg-green-500 text-white p-2 rounded-full shadow-md z-10 transition-opacity duration-300">
            <CartIcon className="text-white" width="20" height="20" />
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="text-2xl text-gray-700">Out of stock</span>
          </div>
        )}
      </>
    );
  };

  const usdPrice = product.prices.map(
    price => price.currency.label === "USD" && "$" + price.amount
  )[0]; // get usd price

  return (
    <Link
      to={product.id}
      className={classNames(
        "w-80 md:w-full relative group cursor-pointer p-2 transition-transform duration-300 hover:scale-105 hover:shadow-[var(--shadow-product)]",
        { "opacity-60": !product.inStock }
      )}
    >
      <InStockOverlay />
      <img
        src={product.gallery[0]}
        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
        className="aspect-square w-full bg-gray-200 object-cover xl:aspect-7/8"
      />
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{usdPrice}</p>
    </Link>
  );
};

export default Card;
