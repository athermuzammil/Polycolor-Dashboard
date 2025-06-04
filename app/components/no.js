import React from "react";

const No = ({ num }) => {
  return (
    <div>
      <div className="bg-[#363B40] rounded-[60px] text-[#ffffff] font-normal font-Matter text-[1rem] xl:text-[0.8rem] h-[30px] w-[30px] xl:h-[26px] xl:w-[26px] flex justify-center items-center">
        {num}
      </div>
    </div>
  );
};

export default No;
