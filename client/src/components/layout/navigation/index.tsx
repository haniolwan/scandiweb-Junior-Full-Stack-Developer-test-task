import { useQuery, gql } from "@apollo/client";
import { Category } from "../../../helpers/types";
import CategoryNav from "./categoryNav";
import { useEffect } from "react";
import { useProductFilters } from "../../../context/productFilters/useProductFilters";

const CATEGORIES_QUERY = gql`
  {
    categories {
      id
      name
    }
  }
`;

export const Navigation = () => {
  const { data } = useQuery(CATEGORIES_QUERY);
  const { updateCategories } = useProductFilters();

  useEffect(() => {
    if (data?.categories?.length) {
      updateCategories(data.categories);
    }
  }, [data, updateCategories]);

  return (
    <nav className="lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {data?.categories.map(({ id, name }: Category) => (
          <CategoryNav key={id} category={name} />
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
