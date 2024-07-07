import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Profile.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { useState } from "react";
import userServices from "@/services/user";

const ProfileMemberView = ({ profile, setProfile, session }: any) => {
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const file = e.target[0]?.files[0];
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const data = {
              image: newImageUrl,
            };
            const result = await userServices.updateProfile(
              profile.id,
              data,
              session.data?.accessToken
            );

            if (result.status === 200) {
              setIsLoading(false);
              setProfile({
                ...profile,
                image: newImageUrl,
              });
              setChangeImage({});
              e.target[0].value = "";
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            setChangeImage({});
            alert("File size Exceeded");
          }
        }
      );
    }
  };
  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile Page</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__avatar}>
          {profile.image ? (
            <Image
              className={styles.profile__main__avatar__image}
              src={profile.image}
              alt="Profile"
              width={200}
              height={200}
            ></Image>
          ) : (
            <div className={styles.profile__main__avatar__image}>
              {profile.fullname?.charAt(0).toUpperCase()}
            </div>
          )}
          <form onSubmit={handleChangeProfilePicture}>
            <label
              className={styles.profile__main__avatar__label}
              htmlFor="upload-image"
            >
              {changeImage.name ? (
                <p>{changeImage.name}</p>
              ) : (
                <>
                  <p>
                    Upload a new avatar, larger image will be resized
                    automatically
                  </p>
                  <p>
                    Maximum upload size : <strong>1 MB</strong>
                  </p>
                </>
              )}
            </label>
            <input
              className={styles.profile__main__avatar__input}
              type="file"
              name="image"
              id="upload-image"
              onChange={(e: any) => {
                e.preventDefault();
                setChangeImage(e.currentTarget.files[0]);
              }}
            />
            <Button
              className={styles.profile__main__avatar__button}
              type="submit"
            >
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </div>
        <div className={styles.profile__main__detail}>
          <form action="">
            <Input
              label="Fullname"
              type="text"
              name="fullname"
              defaultValue={profile.fullname}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              defaultValue={profile.email}
            />
            <Input
              label="Phone"
              type="number"
              name="phone"
              defaultValue={profile.phone}
            />
            {/* <Input
            label="Password"
            type="password"
            name="password"
            defaultValue={profile.password}
          /> */}
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
