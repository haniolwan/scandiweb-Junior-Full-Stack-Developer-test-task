import { MinusIcon, PlusIcon } from "../../../icons";
import classNames from "classnames";

const ToggleAddRemove = ({
  productId,
  type,
  handleAddCartItem,
  handleRemoveCartItem,
}: {
  productId: string;
  type: "add" | "remove";
  handleAddCartItem: (productId: string) => void;
  handleRemoveCartItem: (productId: string) => void;
}) => {
  // To do make sure to not exceed inventory

  return (
    <button
      type="button"
      className="hover:bg-gray-300 ring-1 w-6 h-6 flex items-center justify-center cursor-pointer"
      aria-label={type === "add" ? "Add item" : "Remove item"}
      onClick={() =>
        type === "add"
          ? handleAddCartItem(productId)
          : handleRemoveCartItem(productId)
      }
      data-testid={
        type === "add"
          ? "cart-item-amount-increase"
          : "cart-item-amount-decrease"
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

const ToggleSize = ({
  className,
  attrId,
  size,
  selectedSize,
  setSelectedSize,
  dataSet,
}: {
  attrId: string;
  className?: string;
  size: string;
  selectedSize?: string;
  setSelectedSize: (Id: string, value: string) => void;
  dataSet?: string;
}) => {
  console.log(dataSet);
  const isSelected = size === selectedSize;

  return (
    <button
      type="button"
      className={classNames(
        className,
        "ring-1 w-6 h-6 flex items-center justify-center cursor-pointer",
        { "bg-dark text-white": isSelected, "hover:bg-gray-200": !isSelected }
      )}
      onClick={() => setSelectedSize(attrId, size)}
      aria-label={classNames("Select size ", { size })}
      data-testid={dataSet}
    >
      <span
        className={classNames("text-xs font-medium", {
          "font-bold": isSelected,
        })}
      >
        {size}
      </span>
    </button>
  );
};

const ToggleColor = ({
  className,
  attrId,
  color,
  selectedColor,
  setSelectedColor,
  dataSet,
}: {
  className?: string;
  attrId: string;
  color: string;
  selectedColor?: string;
  setSelectedColor: (Id: string, value: string) => void;
  dataSet?: string;
}) => {
  const isSelected = color === selectedColor;

  return (
    <button
      type="button"
      className={classNames(
        className,
        "ring-1 ring-gray-400 w-5 h-5 cursor-pointer",
        { "ring-2 ring-primary": isSelected },
        { "hover:ring-1": !isSelected }
      )}
      onClick={() => setSelectedColor(attrId, color)}
      aria-label={classNames("Select color ", { color })}
      style={{ backgroundColor: color }}
      data-testid={dataSet}
    ></button>
  );
};

export { ToggleAddRemove, ToggleSize, ToggleColor };
