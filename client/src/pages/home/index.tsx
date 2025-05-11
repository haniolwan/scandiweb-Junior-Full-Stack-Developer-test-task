import { useQuery } from "urql";
import Products from "../../components/products";

const Home = () => {
  const PRODUCTS_QUERY = `
  {
     products {
      id
      name
      price
    }
  }
`;

  const [result] = useQuery({
    query: PRODUCTS_QUERY,
  });

  const { data, fetching, error } = result;

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  console.log(data);

  return <Products />;
};

export default Home;
