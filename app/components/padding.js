import clsx from "clsx";
import React from "react";

const Padding = ({ children, className }) => {
  return (
    <div className={clsx(" px-[1rem] md:px-[2rem] lg:px-[3rem] ", className)}>
      {children}
    </div>
  );
};

export default Padding;
