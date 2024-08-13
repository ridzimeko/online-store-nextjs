import Toaster from "@/components/ui/Toaster";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import Navbar from "../Navbar";
import { ToasterContext } from "@/context/ToasterContext";
import { Lato } from "next/font/google";
import { ToasterType } from "@/types/toaster.type";

type PropTypes = {
  children: React.ReactNode;
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const disableNavbar = ["auth", "admin", "member"];

const AppShell = (props: PropTypes) => {
  const { pathname } = useRouter();
  const { children } = props;
  const { toaster }: ToasterType = useContext(ToasterContext);

  return (
    <>
      <div className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        {children}
        {Object.keys(toaster).length > 0 && <Toaster />}
      </div>
    </>
  );
};

export default AppShell;
