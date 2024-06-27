import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";
import React from "react";
import { title } from "process";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Product",
    url: "/admin/products",
    icon: "bxs-box",
  },
  //   {
  //     title: "Users",
  //     url: "/admin/user",
  //     icon: "bxs-user",
  //   },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.AdminLayout}>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
