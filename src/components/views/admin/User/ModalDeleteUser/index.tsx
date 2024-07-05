import Button from "@/components/ui/Button";
import styles from "./ModalDeleteUser.module.scss";
import userServices from "@/services/user";
import Modal from "@/components/ui/Modal";
import { useSession } from "next-auth/react";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const session: any = useSession();

  const handleDeleteUser = async () => {
    userServices.deleteUser(deletedUser.id, session.data?.accessToken);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
  };
  return (
    <>
      <Modal onClose={() => setDeletedUser({})}>
        <h1 className={styles.modal__title}>Are you sure?</h1>
        {/* <Button type="button" onClick={() => setDeletedUser({})}>
          No
        </Button> */}
        <Button type="button" onClick={() => handleDeleteUser()}>
          Delete
        </Button>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
