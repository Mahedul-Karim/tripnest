import React from "react";

type Props = {
  children: React.ReactNode;
};
const Title: React.FC<Props> = ({ children }) => {
  return (
    <h2 className="text-xl xs:text-2xl font-[500] text-navy">{children}</h2>
  );
};

export default Title;
