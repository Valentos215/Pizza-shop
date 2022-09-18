import React from "react";
import s from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.preloader}></div>
    </div>
  );
};

export default Preloader;
