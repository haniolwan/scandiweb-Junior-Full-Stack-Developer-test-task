import { CartIcon } from "../icons";

const Products = () => {
  type Props = {
    inStock: boolean;
  };
  const Card = ({ inStock }: Props) => {
    return (
      <a
        className={`
      relative group cursor-pointer
      p-2 transition-transform duration-300
      ${
        inStock
          ? "hover:scale-105 hover:shadow-[var(--shadow-product)]"
          : "opacity-60  pointer-events-none"
      }
      `}
      >
        {/* todo add tooltip */}
        {inStock && (
          <div className="hover:scale-105 opacity-0 group-hover:opacity-100 absolute bottom-14 right-6 bg-green-500 text-white p-2 rounded-full shadow-md z-10 transition-opacity duration-300">
            <CartIcon className="text-white" width="20" height="20" />
          </div>
        )}
        {!inStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <span className="text-2xl text-gray-700">Out of stock</span>
          </div>
        )}

        <img
          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg"
          alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
          className="aspect-square w-full bg-gray-200 object-cover xl:aspect-7/8"
        />
        <h3 className="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">$48</p>
      </a>
    );
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <Card inStock={true} />
          <Card inStock={false} />
        </div>
      </div>
    </div>
  );
};

export default Products;
