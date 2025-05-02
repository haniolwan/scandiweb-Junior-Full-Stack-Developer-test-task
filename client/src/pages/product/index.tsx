import { useParams } from "react-router";
import Info from "../../components/product/info";
import ThumbsGallery from "../../components/product/thumbs";
import Layout from "../layout";
import { mockData } from "../../assets/dummyData/Data";
import { Product as ProductType } from "../../helpers/types";
import PageNotFound from "../error/not-found";

const Product = () => {
  const { id } = useParams();

  const product = (mockData.data.products as ProductType[]).find(
    product => product.id === id
  );

  if (!product) {
    return <PageNotFound />;
  }

  return (
    <Layout className="flex-col lg:flex-row">
      <ThumbsGallery gallery={product!.gallery} />
      <Info product={product!} />
    </Layout>
  );
};

export default Product;
