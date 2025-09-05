import React from "react";

interface Props {
  children: React.ReactNode;
  className?:string;
}

const SectionHeading: React.FC<Props> = ({ children,className }) => {
  return <h2 className={`text-lg xs:text-xl text-navy font-semibold ${className}`}>{children}</h2>;
};

export default SectionHeading;