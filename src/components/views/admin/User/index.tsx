import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./User.module.scss";

type PropTypes = {
  users: any;
};

const UserAdminView = (props: PropTypes) => {
  const { users } = props;
  return (
    <AdminLayout>
      <div className={styles.users}>
        <div>User Management</div>
        <table className={styles.users__table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <div className={styles.users__table__action}>
                    <Button type="button">Update</Button>
                    <Button type="button">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UserAdminView;
