import { Product } from "@/types/product.type";
import styles from "./DetailProduct.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import userServices from "@/services/user";
import { ToasterContext } from "@/context/ToasterContext";

type PropTypes = {
  product: Product | any;
  cart: any[];
  productId: string | string[] | undefined;
};

const DetailProductView = (props: PropTypes) => {
  const { setToaster } = useContext(ToasterContext);
  const { product, cart, productId } = props;
  const { status }: any = useSession();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = async () => {
    if (selectedSize !== "") {
      let newCart = [];
      if (
        cart.filter(
          (item: any) => item.id === productId && item.size === selectedSize
        ).length > 0
      ) {
        newCart = cart.map((item: any) => {
          if (item.id === productId && item.size === selectedSize) {
            item.qty += 1;
          }
          return item;
        });
      } else {
        newCart = [
          ...cart,
          {
            id: productId,
            size: selectedSize,
            qty: 1,
          },
        ];
      }
      try {
        const result = await userServices.addToCart({ carts: newCart });
        if (result.status === 200) {
          setSelectedSize("");
          setToaster({
            variant: "success",
            message: "Success Add To Cart",
          });
        }
      } catch (error) {
        setToaster({
          variant: "danger",
          message: "Failed Add To Cart",
        });
      }
    }
  };

  return (
    <div className={styles.detail}>
      <div className={styles.detail__main}>
        <div className={styles.detail__main__left}>
          <Image
            src={product?.image}
            alt={product?.name}
            width={500}
            height={500}
            className={styles.detail__main__left__image}
          />
        </div>
        <div className={styles.detail__main__right}>
          <h3>{product?.name}</h3>
          <h3 className={styles.detail__main__right__category}>
            {product?.category}
          </h3>
          <h3 className={styles.detail__main__right__price}>
            {convertIDR(product?.price)}
          </h3>
          <p className={styles.detail__main__right__description}>
            {product?.description}
          </p>
          <p className={styles.detail__main__right__subtitle}>Select Size</p>
          <div className={styles.detail__main__right__size}>
            {product?.stock?.map((item: { size: string; qty: number }) => (
              <div
                className={styles.detail__main__right__size__item}
                key={item.size}
              >
                <input
                  className={styles.detail__main__right__size__item__input}
                  type="radio"
                  name="size"
                  id={`size-${item.size}`}
                  disabled={item.qty === 0}
                  onClick={() => setSelectedSize(item.size)}
                  checked={selectedSize === item.size}
                />
                <label
                  className={styles.detail__main__right__size__item__label}
                  htmlFor={`size-${item.size}`}
                >
                  {item.size}
                </label>
              </div>
            ))}
          </div>
          <Button
            className={styles.detail__main__right__add}
            type={status === "authenticated" ? "submit" : "button"}
            onClick={() => {
              status === "unauthenticated"
                ? router.push(`/auth/login?callbackUrl=${router.asPath}`)
                : handleAddToCart();
            }}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailProductView;
