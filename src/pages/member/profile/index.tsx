import ProfileMemberView from "@/components/views/member/Profile";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProfilePage = ({ setToaster }: PropTypes) => {
  return (
    <>
      <ProfileMemberView setToaster={setToaster} />
    </>
  );
};

export default ProfilePage;
