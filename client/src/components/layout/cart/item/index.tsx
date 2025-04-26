import { useState } from "react";
import { ToggleAddRemove, ToggleColor, ToggleSize } from "../buttons";

const Item = () => {
  const sizes: ("XS" | "S" | "M" | "L")[] = ["XS", "S", "M", "L"];
  const colors = ["#D3D2D5", "#2B2B2B", "#0F6450"];

  const [selectedSize, setSelectedSize] = useState<"XS" | "S" | "M" | "L">("M");
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [count, setCount] = useState<number>(1);

  return (
    <li className="flex space-x-4 py-6">
      <div>
        <h3 className="text-md flex-grow">Running Short</h3>
        <p className="font-semibold">$90.00</p>
        <div>
          <p className="py-2">Size:</p>
          <ul className="flex gap-2">
            {sizes.map(size => (
              <ToggleSize
                key={size}
                size={size}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            ))}
          </ul>

          <p className="py-2">Color:</p>
          <ul className="flex gap-2">
            {colors.map(color => (
              <ToggleColor
                key={color}
                color={color}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col justify-between items-center">
          <ToggleAddRemove type="add" count={count} setCount={setCount} />
          <p>{count}</p>
          <ToggleAddRemove type="remove" count={count} setCount={setCount} />
        </div>
        <div className="w-[121px] h-[167px] shrink-0 overflow-hidden">
          <img
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </li>
  );
};

export default Item;
