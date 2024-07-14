import LoginView from "@/components/views/auth/login";
import { Dispatch, SetStateAction } from "react";

const loginPage = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  return (
    <>
      <LoginView setToaster={setToaster} />
    </>
  );
};

export default loginPage;
