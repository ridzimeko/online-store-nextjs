import { Product } from "@/types/product.type";
import styles from "./Checkout.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Fragment, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import productServices from "@/services/product";
import { useSession } from "next-auth/react";
import ModalChangeAddress from "./ModalChangeAddress";

const CheckoutView = () => {
  const session: any = useSession();
  const [profile, setProfile] = useState<any>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState(false);

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
    if (data?.data?.address?.length > 0) {
      data.data.address.filter((address: { isMain: boolean }, id: number) => {
        if (address.isMain) {
          setSelectedAddress(id);
        }
      });
    }
  };

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    if (session.data?.accessToken) {
      getProfile();
    }
  }, [session]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getProduct = (id: string) => {
    const product = products.find((product: Product) => product.id === id);
    return product;
  };

  const getTotalPrize = () => {
    if (!profile.carts?.length) return 0;
    const total = profile.carts.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };

  return (
    <>
      <div className={styles.checkout}>
        <div className={styles.checkout__main}>
          <h1 className={styles.checkout__main__title}>Checkout</h1>
          <div className={styles.checkout__main__address}>
            <h3>Address</h3>
            <div className={styles.checkout__main__address__title}>
              <h3>Shipping Address</h3>
            </div>
            {profile?.address?.length > 0 ? (
              <div className={styles.checkout__main__address__selected}>
                <h4>
                  {profile?.address?.[selectedAddress]?.recipient} -{" "}
                  {profile?.address?.[selectedAddress]?.phone}
                </h4>
                <p
                  className={styles.checkout__main__address__selected__address}
                >
                  {profile?.address?.[selectedAddress]?.addressLine}
                </p>
                <p className={styles.checkout__main__address__selected__note}>
                  Note: {profile?.address?.[selectedAddress]?.note}
                </p>
                <Button type="button" onClick={() => setChangeAddress(true)}>
                  Change Address
                </Button>
              </div>
            ) : (
              <Button type="button" onClick={() => setChangeAddress(true)}>
                Add New Address
              </Button>
            )}
          </div>
          <div className={styles.checkout__main__list}>
            {profile.carts?.length > 0 ? (
              profile.carts.map(
                (item: { id: string; size: string; qty: number }) => (
                  <Fragment key={`${item.id}-${item.size}`}>
                    <div className={styles.checkout__main__list__item}>
                      <Image
                        src={getProduct(item.id)?.image || "/"}
                        alt={`${getProduct(item.id)?.name} with size ${
                          item.size
                        }`}
                        width={150}
                        height={150}
                        className={styles.checkout__main__list__item__image}
                      />
                      <div className={styles.checkout__main__list__item__info}>
                        <h4
                          className={
                            styles.checkout__main__list__item__info__title
                          }
                        >
                          {getProduct(item.id)?.name}
                        </h4>
                        <div
                          className={
                            styles.checkout__main__list__item__info__data
                          }
                        >
                          <label
                            className={
                              styles.checkout__main__list__item__info__data__size
                            }
                          >
                            Size {item.size}
                          </label>
                          <label
                            className={
                              styles.checkout__main__list__item__info__data__qty
                            }
                          >
                            Quantity {item.qty}
                          </label>
                        </div>
                      </div>
                      <h4 className={styles.checkout__main__list__item__price}>
                        {convertIDR(getProduct(item.id)?.price)}
                      </h4>
                    </div>
                    <hr
                      className={styles.checkout__main__list__item__divider}
                    />
                  </Fragment>
                )
              )
            ) : (
              <p className={styles.checkout__main__list__empty}>
                Cart is empty
              </p>
            )}
          </div>
        </div>
        <div className={styles.checkout__summary}>
          <h1 className={styles.checkout__summary_title}>Summary</h1>
          <div className={styles.checkout__summary__item}>
            <h4>Subtotal</h4>
            <p> {convertIDR(getTotalPrize())}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Delivery</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Tax</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <hr />
          <div className={styles.checkout__summary__item}>
            <h4>Total</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <hr />
          <Button type="button" className={styles.checkout__summary__button}>
            Proceed Payment
          </Button>
        </div>
      </div>
      {changeAddress && (
        <ModalChangeAddress
          profile={profile}
          setProfile={setProfile}
          setChangeAddress={setChangeAddress}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      )}
    </>
  );
};

export default CheckoutView;
