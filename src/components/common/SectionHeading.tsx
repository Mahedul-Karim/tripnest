import React from "react";

interface Props {
  children: React.ReactNode;
}

const SectionHeading: React.FC<Props> = ({ children }) => {
  return (
    <h3 className="text-navy text-xl xs:text-2xl font-bold">{children}</h3>
  );
};

export default SectionHeading;
