import React from "react";

interface Props {
  children: React.ReactNode;
}

const Title: React.FC<Props> = ({ children }) => {
  return (
    <h3 className="text-navy font-semibold text-xl xs:text-2xl">{children}</h3>
  );
};

export default Title;
