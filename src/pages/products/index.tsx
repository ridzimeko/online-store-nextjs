import ProductView from "@/components/views/Products";
import productServices from "@/services/product";
import Head from "next/head";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Product</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductView products={products} />
    </>
  );
};

export default ProductPage;
