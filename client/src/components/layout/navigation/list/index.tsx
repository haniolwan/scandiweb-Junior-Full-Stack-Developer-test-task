import { useQuery, gql } from "@apollo/client";
import { Category } from "../../../../helpers/types";
import NavLink from "../navlink";

const CATEGORIES_QUERY = gql`
  {
    categories {
      id
      name
    }
  }
`;

const List = () => {
  const { data } = useQuery(CATEGORIES_QUERY);

  return (
    <div className="lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {data?.categories?.map(({ id, name }: Category) => (
          <NavLink key={id} category={name} />
        ))}
      </div>
    </div>
  );
};

export default List;
