import { Product } from "@/types/product.type";
import styles from "./DetailProduct.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";

type PropTypes = {
  product: Product | any;
};

const DetailProductView = (props: PropTypes) => {
  const { product } = props;

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
          <p className={styles.detail__main__right__subtitle}>Select Size</p>
          <div className={styles.detail__main__right__size}>
            {product?.stock?.map((item: {size: string, qty: number}) => (
              <div
                className={styles.detail__main__right__size__item}
                key={item.size}
              >
                <input
                  className={styles.detail__main__right__size__item__input}
                  type="radio"
                  name="size"
                  id={`size-${item.size}`}
                  disabled={item.qty < 1}
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
          <Button className={styles.detail__main__right__add} type="submit">Add To Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailProductView;
