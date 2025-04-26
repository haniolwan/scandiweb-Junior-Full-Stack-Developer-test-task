import classNames from "classnames";
import { useProductFilters } from "../../../context/productFilters";

type Props = {
  categories: string[];
};
const Navigation = ({ categories }: Props) => {
  const Link = ({ category }: { category: string }) => {
    const { filter, updatedFilters } = useProductFilters();

    console.log(category);
    return (
      <div
        className={classNames("hover:border-b border-primary relative flex", {
          "border-b border-primary": filter === category,
        })}
      >
        <button
          type="button"
          className={classNames(
            "cursor-pointer capitalize relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-primary",
            { "text-primary ": filter === category }
          )}
          aria-expanded="false"
          onClick={() => updatedFilters(category)}
        >
          {category}
        </button>
      </div>
    );
  };

  return (
    <div className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {categories.map(category => (
          <Link key={category} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
