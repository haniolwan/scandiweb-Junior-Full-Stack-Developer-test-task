import Info from "../../components/product/info";
import ThumbsGallery from "../../components/product/thumbs";
import Layout from "../layout";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const PRODUCTS_QUERY = gql`
  query GetProducts($id: String) {
    products(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;

const Product = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(PRODUCTS_QUERY, {
    variables: { id },
  });

  console.log(data);
  return (
    data?.products &&
    !loading && (
      <Layout className="flex-col lg:flex-row">
        <ThumbsGallery gallery={data?.products[0]?.gallery} />
        <Info product={data?.products[0]} />
      </Layout>
    )
  );
};

export default Product;
