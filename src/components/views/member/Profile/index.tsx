import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Profile.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import userServices from "@/services/user";
import { User } from "@/types/user.type";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProfileMemberView = ({ setToaster }: PropTypes) => {
  const [changeImage, setChangeImage] = useState<File | any>({});
  const [isLoading, setIsLoading] = useState<string>("");
  const [profile, setProfile] = useState<User | any>({});

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(data);

    if (result.status === 200) {
      setIsLoading("");
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      form.reset();
      setToaster({
        variant: "success",
        message: "Success Update Profile",
      });
    } else {
      setIsLoading("");
    }
  };

  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("picture");
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    const newName = "profile." + file.name.split(".")[1];

    if (file) {
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const data = {
              image: newImageUrl,
            };
            const result = await userServices.updateProfile(data);

            if (result.status === 200) {
              setIsLoading("");
              setProfile({
                ...profile,
                image: newImageUrl,
              });
              setChangeImage({});
              form.reset();
              setToaster({
                variant: "success",
                message: "Success Change Avatar",
              });
            } else {
              setIsLoading("");
            }
          } else {
            setIsLoading("");
            setChangeImage({});
            setToaster({
              variant: "danger",
              message: "File size exceed limit",
            });
          }
        }
      );
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;
    const data = {
      oldPassword: form["old-password"].value,
      password: form["new-password"].value,
      encryptedPassword: profile.password,
    };

    try {
      const result = await userServices.updateProfile(data);

      if (result.status === 200) {
        setIsLoading("");
        form.reset();
        setToaster({
          variant: "success",
          message: "Success Update Password",
        });
      }
    } catch (error) {
      setIsLoading("");
      setToaster({
        variant: "danger",
        message: "Failed Update Profile",
      });
    }
  };

  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile Page</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__row}>
          <div className={styles.profile__main__row__avatar}>
            <h2 className={styles.profile__main__row__avatar__title}>Avatar</h2>
            {profile.image ? (
              <Image
                className={styles.profile__main__row__avatar__image}
                src={profile.image}
                alt="Profile"
                width={200}
                height={200}
              ></Image>
            ) : (
              <div className={styles.profile__main__row__avatar__image}>
                {profile.fullname?.charAt(0).toUpperCase()}
              </div>
            )}
            <form onSubmit={handleChangeProfilePicture}>
              <label
                className={styles.profile__main__row__avatar__label}
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
                className={styles.profile__main__row__avatar__input}
                type="file"
                name="image"
                id="upload-image"
                onChange={(e: any) => {
                  e.preventDefault();
                  setChangeImage(e.currentTarget.files[0]);
                }}
              />
              <Button
                className={styles.profile__main__row__avatar__button}
                type="submit"
              >
                {isLoading === "picture" ? "Uploading..." : "Upload"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__profile}>
            <h2 className={styles.profile__main__row__profile__title}>
              Profile
            </h2>
            <form
              onSubmit={handleChangeProfile}
              className={styles.profile__main__row__profile__form}
            >
              <Input
                label="Fullname"
                type="text"
                name="fullname"
                defaultValue={profile.fullname}
                className={styles.profile__main__row__profile__form__input}
              />
              <Input
                label="Phone"
                type="number"
                name="phone"
                defaultValue={profile.phone}
                placeholder="Enter your phone number"
                className={styles.profile__main__row__profile__form__input}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                defaultValue={profile.email}
                className={styles.profile__main__row__profile__form__input}
              />
              <Input
                label="Role"
                type="text"
                name="role"
                defaultValue={profile.role}
                disabled
                className={styles.profile__main__row__profile__form__input}
              />
              {/* <Input
            label="Password"
            type="password"
            name="password"
            defaultValue={profile.password}
            className={styles.profile__main__row__profile__form__input}
          /> */}
              <Button type="submit" variant="primary">
                {isLoading === "profile" ? "Loading..." : "Update Profile"}
              </Button>
            </form>
          </div>

          <div className={styles.profile__main__row__password}>
            <h2>Change Password</h2>
            <form
              onSubmit={handleChangePassword}
              className={styles.profile__main__row__password__form}
            >
              <Input
                type="password"
                name="old-password"
                label="Old Password"
                disabled={profile.type === "google"}
                placeholder="Enter your current password"
                className={styles.profile__main__row__password__form__input}
              />
              <Input
                type="password"
                name="new-password"
                label="New Password"
                disabled={profile.type === "google"}
                placeholder="Enter your new password"
                className={styles.profile__main__row__password__form__input}
              />
              <Button
                type="submit"
                disabled={isLoading === "password" || profile.type === "google"}
              >
                {isLoading === "password" ? "Loading..." : "Update Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
