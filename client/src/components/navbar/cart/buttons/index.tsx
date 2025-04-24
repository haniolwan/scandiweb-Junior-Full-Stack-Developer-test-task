import { Dispatch, SetStateAction } from "react";
import { MinusIcon, PlusIcon } from "../../../icons";

const ToggleAddRemove = ({
  type,
  count,
  setCount,
}: {
  type: "add" | "remove";
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}) => {
  // To do make sure to not exceed inventory
  return (
    <button
      type="button"
      className="hover:bg-gray-300 ring-1 w-6 h-6 flex items-center justify-center cursor-pointer"
      aria-label={type === "add" ? "Add item" : "Remove item"}
      onClick={() =>
        type === "add" ? setCount(count + 1) : count > 1 && setCount(count - 1)
      }
    >
      {type === "add" ? (
        <PlusIcon width="16" height="16" />
      ) : (
        <MinusIcon width="16" height="16" />
      )}
    </button>
  );
};

type Size = "XS" | "S" | "M" | "L";

const ToggleSize = ({
  size,
  selectedSize,
  setSelectedSize,
}: {
  size: Size;
  selectedSize: Size;
  setSelectedSize: Dispatch<SetStateAction<Size>>;
}) => {
  const isSelected = size === selectedSize;

  return (
    <button
      type="button"
      className={`ring-1 w-6 h-6 flex items-center justify-center cursor-pointer ${
        isSelected ? "bg-dark text-white" : "hover:bg-gray-200"
      }`}
      onClick={() => setSelectedSize(size)}
      aria-label={`Select size ${size}`}
    >
      <span className={`text-xs font-medium ${isSelected ? "font-bold" : ""}`}>
        {size}
      </span>
    </button>
  );
};

const ToggleColor = ({
  color,
  selectedColor,
  setSelectedColor,
}: {
  color: string;
  selectedColor?: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}) => {
  const isSelected = color === selectedColor;
  return (
    <button
      type="button"
      className={`w-5 h-5 cursor-pointer ${
        isSelected ? "ring-1 ring-primary" : "hover:ring-1"
      }`}
      onClick={() => setSelectedColor(color)}
      aria-label={`Select color ${color}`}
      style={{ backgroundColor: color }}
    ></button>
  );
};

export { ToggleAddRemove, ToggleSize, ToggleColor };
