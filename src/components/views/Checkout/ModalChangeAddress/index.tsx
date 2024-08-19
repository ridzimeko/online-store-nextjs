import Button from "@/components/ui/Button";
import styles from "./ModalChangeAddress.module.scss";
import Modal from "@/components/ui/Modal";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/TextArea";
import userServices from "@/services/user";
import { ToasterContext } from "@/context/ToasterContext";

type PropTypes = {
  profile: any;
  setProfile: Dispatch<SetStateAction<any>>;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  selectedAddress: number;
};

const ModalChangeAddress = (props: PropTypes) => {
  const {
    profile,
    setProfile,
    setChangeAddress,
    setSelectedAddress,
    selectedAddress,
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddNew, setIsAddNew] = useState<boolean>(false);
  const [updateAddress, setUpdateAddress] = useState<number>();
  const { setToaster } = useContext(ToasterContext);

  const handleDeleteAddress = async (id: number) => {
    const address = profile.address;
    address.splice(id, 1);
    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);

      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({ ...profile, address: data.address });
        setToaster({
          variant: "success",
          message: "Success Delete Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Address",
      });
    }

    console.log(data);
  };

  const handleAddAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let data;

    if (profile.address) {
      data = {
        address: [
          ...profile.address,
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: false,
          },
        ],
      };
    } else {
      data = {
        address: [
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: true,
          },
        ],
      };
    }

    try {
      const result = await userServices.updateProfile(data);

      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({ ...profile, address: data.address });
        form.reset();
        setToaster({
          variant: "success",
          message: "Success Add New Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Add New Address",
      });
    }
  };

  const handleChangeAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const address = profile.address;
    const id = updateAddress || 0;
    address[id] = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      note: form.note.value,
      isMain: address[id].isMain,
    };

    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);

      if (result.status === 200) {
        setIsLoading(false);
        setUpdateAddress(undefined);
        setProfile({ ...profile, address: data.address });
        form.reset();
        setToaster({
          variant: "success",
          message: "Success Add New Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Add New Address",
      });
    }
  };

  const handleChangeMainAddress = async (id: number) => {
    const address = profile.address;
    address.forEach((item: { isMain: boolean }, index: number) => {
      if (index === id) {
        item.isMain = true;
      } else {
        item.isMain = false;
      }
    });

    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);

      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({ ...profile, address: data.address });
        setToaster({
          variant: "success",
          message: "Success Change Main Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Change Main Address",
      });
    }
  };
  return (
    <>
      <Modal onClose={() => setChangeAddress(false)}>
        <h1 className={styles.modal__title}>Select Shipping Address</h1>
        {profile?.address?.map((item: any, id: number) => (
          <div key={id}>
            <div
              className={`${styles.modal__address} ${
                id === selectedAddress && styles["modal__address--active"]
              }`}
            >
              <div
                className={styles.modal__address__info}
                onClick={() => {
                  setSelectedAddress(id);
                  setChangeAddress(false);
                }}
              >
                <h4 className={styles.modal__address__info__title}>
                  Recipient: {item.recipient}
                </h4>
                <p>Phone: {item.phone}</p>
                <p>Address: {item.addressLine}</p>
                <p>Note: {item.note}</p>
              </div>
              <div className={styles.modal__address__action}>
                <Button
                  type="button"
                  className={styles.modal__address__action__delete}
                  onClick={() => handleDeleteAddress(id)}
                  disabled={isLoading || id === selectedAddress}
                >
                  <i className="bx bxs-trash-alt"></i>
                </Button>
                <Button
                  type="button"
                  className={styles.modal__address__action__change}
                  onClick={() => handleChangeMainAddress(id)}
                  disabled={isLoading || item.isMain}
                >
                  <i className="bx bx-purchase-tag-alt"></i>
                </Button>
                <Button
                  type="button"
                  className={styles.modal__address__action__change}
                  onClick={() =>
                    id === updateAddress
                      ? setUpdateAddress(undefined)
                      : setUpdateAddress(id)
                  }
                  disabled={isLoading}
                >
                  <i className="bx bx-pencil"></i>
                </Button>
              </div>
            </div>
            {id === updateAddress && (
              <div className={styles.modal__form}>
                <form
                  className={styles.modal__form__group}
                  onSubmit={(e) => handleChangeAddress(e)}
                >
                  <Input
                    type="text"
                    name="recipient"
                    label="Recipient"
                    placeholder="Insert Recipient"
                    defaultValue={item.recipient}
                  />
                  <Input
                    type="number"
                    name="phone"
                    label="Recipient Phone"
                    placeholder="Insert Recipient Phone"
                    defaultValue={item.phone}
                  />
                  <Textarea
                    name="addressLine"
                    label="Address"
                    placeholder="Insert Address"
                    defaultValue={item.addressLine}
                  />
                  <Input
                    type="text"
                    name="note"
                    label="Note"
                    placeholder="Insert Note"
                    defaultValue={item.note}
                  />
                  <Button
                    className={styles.modal__btn}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Save Address"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        ))}
        {isAddNew && (
          <form
            className={styles.modal__form__group}
            onSubmit={(e) => handleAddAddress(e)}
          >
            <Input
              type="text"
              name="recipient"
              label="Recipient"
              placeholder="Insert Recipient"
            />
            <Input
              type="number"
              name="phone"
              label="Recipient Phone"
              placeholder="Insert Recipient Phone"
            />
            <Textarea
              name="addressLine"
              label="Address"
              placeholder="Insert Address"
            />
            <Input
              type="text"
              name="note"
              label="Note"
              placeholder="Insert Note"
            />
            <Button
              className={styles.modal__btn}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Save Address"}
            </Button>
          </form>
        )}
        <Button
          className={styles.modal__btn}
          type="button"
          onClick={() => setIsAddNew(!isAddNew)}
        >
          {isAddNew ? "Cancel" : "Add New Address"}
        </Button>
      </Modal>
    </>
  );
};

export default ModalChangeAddress;
