import classNames from "classnames";
import { useProductFilters } from "../../../context/productFilters";

type Props = {
  categories: string[];
};

export const CategoryNav = ({ category }: { category: string }) => {
  const { filter, updatedFilters } = useProductFilters();

  const isActive = filter === category;
  return (
    <div
      className={classNames("hover:border-b border-primary relative flex", {
        "border-b border-primary": isActive,
      })}
    >
      <button
        type="button"
        className={classNames(
          "cursor-pointer capitalize relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-primary",
          { "text-primary ": isActive }
        )}
        aria-expanded="false"
        onClick={() => updatedFilters(category)}
        data-testid={isActive ? "active-category-link" : "category-link"}
      >
        {category}
      </button>
    </div>
  );
};
export const Navigation = ({ categories }: Props) => {
  return (
    <div className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {categories.map(category => (
          <CategoryNav key={category} category={category} />
        ))}
      </div>
    </div>
  );
};

export default { Navigation, CategoryNav };
