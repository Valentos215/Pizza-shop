import s from "./ProductSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <Skeleton height={176} />
      </div>
      <p className={s.title}>
        <Skeleton />
      </p>
      <div className={s.size}>
        <Skeleton />
      </div>
      <div className={s.checkout}>
        <Skeleton />
      </div>
    </div>
  );
};

export default ProductSkeleton;
