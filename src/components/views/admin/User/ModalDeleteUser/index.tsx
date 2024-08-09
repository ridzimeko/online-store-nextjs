import Button from "@/components/ui/Button";
import styles from "./ModalDeleteUser.module.scss";
import userServices from "@/services/user";
import Modal from "@/components/ui/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "@/types/user.type";

type PropTypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteUser = (props: PropTypes) => {
  const { deletedUser, setDeletedUser, setUsersData, setToaster } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteUser = async () => {
    const result = await userServices.deleteUser(deletedUser.id);

    if (result.status === 200) {
      setIsLoading(false);
      setDeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
      setToaster({
        variant: "success",
        message: "Success Delete User",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Failed Delete User",
      });
    }
  };
  return (
    <>
      <Modal onClose={() => setDeletedUser({})}>
        <h1 className={styles.modal__title}>Are you sure?</h1>
        {/* <Button type="button" onClick={() => setDeletedUser({})}>
          No
        </Button> */}
        <Button type="button" onClick={() => handleDeleteUser()}>
          {isLoading ? "Loading..." : "Yes"}
        </Button>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
