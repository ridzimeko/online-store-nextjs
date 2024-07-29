import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalUpdateProduct.module.scss";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/InputFile";
import Image from "next/image";
import productServices from "@/services/product";
import { uploadFile } from "@/lib/firebase/service";
import { useSession } from "next-auth/react";

type PropTypes = {
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalUpdateProduct = (props: PropTypes) => {
  const { updatedProduct, setUpdatedProduct, setToaster, setProductsData } =
    props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stockCount, setStockCount] = useState(updatedProduct.stock);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const data = {
              image: newImageUrl,
            };

            const result = await productServices.updateProduct(
              id,
              data,
              session.data?.accessToken
            );

            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setUpdatedProduct(false);
              const { data } = await productServices.getAllProducts();
              setProductsData(data.data);
              setToaster({
                variant: "success",
                message: "Success Add Product",
              });
            } else {
              setIsLoading(false);
              setToaster({
                variant: "danger",
                message: "Failed Add Product",
              });
            }
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed Add Product",
            });
          }
        }
      );
    }
  };

  const updateProduct = async (form: any, newImageUrl: string = updatedProduct.image) => {
    const data = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      image: newImageUrl,
    };

    const result = await productServices.updateProduct(
      updatedProduct.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update Product",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Update Product",
      });
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];

    if (file) {
      const newName = "main." + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
          updateProduct(form, newImageUrl)
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed Update Product",
            });
          }
        }
      );
    } else {
      updateProduct(form)
    }
  };

  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
          defaultValue={updatedProduct.name}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          defaultValue={updatedProduct.price}
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
          defaultValue={updatedProduct.category}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
          defaultValue={updatedProduct.status}
        />
        <label htmlFor="image">images</label>
        <div className={styles.form__image}>
          <Image
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            alt="product"
            width={200}
            height={200}
            className={styles.form__image__preview}
          />
          <InputFile
            name="image"
            setUploadedImage={setUploadedImage}
            uploadedImage={uploadedImage}
          />
        </div>
        <label htmlFor="stock">Stock</label>
        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div className={styles.form__stock} key={i}>
            <div className={styles.form__stock__item}>
              <Input
                label="Size"
                name="size"
                type="text"
                placeholder="Insert product size"
                onChange={(e) => handleStock(e, i, "size")}
                defaultValue={item.size}
              />
              <Input
                label="Qty"
                name="qty"
                type="number"
                placeholder="Insert product quantity"
                onChange={(e) => handleStock(e, i, "qty")}
                defaultValue={item.qty}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          className={styles.form__stock__button}
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
        >
          Add New Stock
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
