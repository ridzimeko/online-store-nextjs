import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useState } from "react";

const NavItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Products",
    href: "/products",
  },
];
const Navbar = () => {
  const { data }: any = useSession();
  const { pathname, push } = useRouter();
  const [dropdownUser, setDropdownUser] = useState(false);
  return (
    <div className={styles.navbar}>
      <h1>Toko Sepatu</h1>
      <div className={styles.navbar__nav}>
        {NavItems.map((item) => (
          <Link
            key={`nav-${item.title}`}
            className={`${styles.navbar__nav__item} ${
              pathname === item.href && styles["navbar__nav__item--active"]
            }`}
            href={item.href}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {data ? (
        <div className={styles.navbar__user}>
          <div className={styles.navbar__user__cart}>
            <Link href={"/cart"}>
              <i
                className={`${styles.navbar__user__cart__icon} bx bx-cart-alt`}
              />
            </Link>
          </div>
          <div className={styles.navbar__user__profile}>
            <Image
              src={data?.user.image}
              alt={data?.user.name}
              width={40}
              height={40}
              className={styles.navbar__user__profile__image}
              onClick={() => setDropdownUser(!dropdownUser)}
            />
            <div
              className={`${styles.navbar__user__profile__dropdown} ${
                dropdownUser &&
                styles["navbar__user__profile__dropdown--active"]
              }`}
            >
              <button
                onClick={() => push("/member/profile")}
                className={styles.navbar__user__profile__dropdown__item}
              >
                Profile
              </button>
              <button
                className={styles.navbar__user__profile__dropdown__item}
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          className={styles.navbar__button}
          onClick={() => signIn()}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Navbar;
