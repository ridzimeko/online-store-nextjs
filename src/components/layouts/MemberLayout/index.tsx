import Sidebar from "@/components/fragments/Sidebar";
import styles from "./MemberLayout.module.scss";
import React from "react";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "bxs-dashboard",
  },
  {
    title: "Orders",
    url: "/member/orders",
    icon: "bxs-cart-alt",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "bxs-user",
  },
];

const MemberLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.member}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.member__main}> {children}</div>
    </div>
  );
};

export default MemberLayout;
