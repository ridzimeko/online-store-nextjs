import UserAdminView from "@/components/views/admin/User";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const AdminUserPage = ({ setToaster }: any) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <UserAdminView users={users} setToaster={setToaster} />
    </>
  );
};

export default AdminUserPage;
