import Image from "next/image";
import styles from "./Card.module.scss";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";

type PropTypes = {
  product: Product;
};

const Card = (props: PropTypes) => {
  const { product } = props;
  return (
    <div className={styles.card}>
      <Image
        className={styles.card__image}
        alt="Product"
        src={product.image}
        width={200}
        height={200}
      />
      <h4 className={styles.card__name}>
        {product.name}
      </h4>
      <p className={styles.card__category}>
        {product.category}
      </p>
      <p className={styles.card__price}>
        {convertIDR(product.price)}
      </p>
    </div>
  );
};

export default Card;
