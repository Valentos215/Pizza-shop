import s from "./ProductSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PizzaSkeleton = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <Skeleton height={176} />
      </div>
      <div className={s.title}>
        <Skeleton />
      </div>
      <div className={s.ingredients}>
        <Skeleton count={2} />
        <p>
          <Skeleton />
        </p>
      </div>
      <div className={s.size}>
        <Skeleton />
      </div>
      <div className={s.crust}>
        <Skeleton />
      </div>
      <div className={s.crust}>
        <Skeleton />
      </div>
      <div className={s.checkout}>
        <Skeleton />
      </div>
    </div>
  );
};

export default PizzaSkeleton;
