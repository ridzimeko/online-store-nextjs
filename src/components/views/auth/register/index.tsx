import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

const RegisterView = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
      const result = await authServices.registerAccount(data);

      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
        setToaster({
          variant: "success",
          message: "Register success!",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Unable to register, please call support",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Unable to register, Email is already registered",
      });
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Have an account? Sign in"
      setToaster={setToaster}
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="Fullname" name="fullname" type="text" />
        <Input label="Phone" name="phone" type="number" />
        <Input label="Password" name="password" type="password" />
        <Button className={styles.register__button} disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
