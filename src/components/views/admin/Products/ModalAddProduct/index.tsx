import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./ModalAddProduct.module.scss";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/InputFile";

type PropTypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalAddProduct = (props: PropTypes) => {
  const { setModalAddProduct, setToaster, setProductsData } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1>Update User</h1>
      <form className={styles.form}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
        />
        <Input label="Price" name="number" type="text" />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
        />
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
              />
              <Input
                label="Qty"
                name="qty"
                type="number"
                placeholder="Insert product quantity"
                onChange={(e) => handleStock(e, i, "qty")}
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
        <label htmlFor="image">images</label>
        <InputFile
          name="image"
          setUploadedImage={setUploadedImage}
          uploadedImage={uploadedImage}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
