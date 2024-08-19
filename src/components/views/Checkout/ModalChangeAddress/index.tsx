import Button from "@/components/ui/Button";
import styles from "./ModalChangeAddress.module.scss";
import Modal from "@/components/ui/Modal";
import { Dispatch, SetStateAction } from "react";
import { Product } from "@/types/product.type";

type PropTypes = {
  address: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  selectedAddress: number;
};

const ModalChangeAddress = (props: PropTypes) => {
  const { address, setChangeAddress, setSelectedAddress, selectedAddress } =
    props;
  return (
    <>
      <Modal onClose={() => setChangeAddress(false)}>
        <h1 className={styles.modal__title}>Change Shipping Address</h1>
        {address.map((item: any, id: number) => (
          <div
            key={id}
            className={`${styles.modal__address} ${
              id === selectedAddress && styles["modal__address--active"]
            }`}
            onClick={() => {
              setSelectedAddress(id);
              setChangeAddress(false);
            }}
          >
            <h4>Recipient: {item.recipient}</h4>
            <p>Phone: {item.phone}</p>
            <p>Address: {item.addressLine}</p>
            <p>Note: {item.note}</p>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default ModalChangeAddress;
