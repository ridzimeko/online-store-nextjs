import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { signIn } from "next-auth/react";
import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const LoginView = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
        setToaster({
          variant: "success",
          message: "Login success!",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Email or password is incorrect",
        });
      }
    } catch (err) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Unable to login, please call support",
      });
    }
  };

  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have an account? Sign up"
      setToaster={setToaster}
    >
      <form onSubmit={handleSubmit}>
        <Input
          className={styles.login__input}
          label="Email"
          name="email"
          type="email"
        />
        <Input
          className={styles.login__input}
          label="Password"
          name="password"
          type="password"
        />
        <Button className={styles.login__button} disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className={styles.login__divider} />
      <div className={styles.login__other}>
        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          className={styles.login__other__button}
        >
          <i className="bx bxl-google"></i> Login With Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
