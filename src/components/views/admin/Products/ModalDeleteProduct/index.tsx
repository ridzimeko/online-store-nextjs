import Button from "@/components/ui/Button";
import styles from "./ModalDeleteProduct.module.scss";
import Modal from "@/components/ui/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import { useSession } from "next-auth/react";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { deleteFile } from "@/lib/firebase/service";

type PropTypes = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteProduct = (props: PropTypes) => {
  const { deletedProduct, setDeletedProduct, setProductsData, setToaster } =
    props;
    const session: any = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteUser = async () => {
    const result = await productServices.deleteProduct(
      deletedProduct.id,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading(false);
      setDeletedProduct({});
      deleteFile(`/images/products/${deletedProduct.id}/${deletedProduct.image.split("%2F")[3].split("?")[0]}`, async (status: boolean) => {
        if (status) {
          setToaster({
            variant: "success",
            message: "Success Delete Product",
          });
          const { data } = await productServices.getAllProducts();
          setProductsData(data.data);
        }
      })
    } else {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Failed Delete Product",
      });
    }
  };
  return (
    <>
      <Modal onClose={() => setDeletedProduct({})}>
        <h1 className={styles.modal__title}>Are you sure?</h1>
        <Button type="button" onClick={() => handleDeleteUser()}>
          {isLoading ? "Loading..." : "Yes"}
        </Button>
      </Modal>
    </>
  );
};

export default ModalDeleteProduct;
