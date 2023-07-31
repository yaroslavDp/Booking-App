import React from "react";
import Notification from "./Notification/Notification";


interface MainSectionProps {
  className: string;
  h1?: string;
  children: React.ReactNode;
}

const MainSection: React.FC<MainSectionProps> = ({ className, h1 = "Travel App", children }) => {
  return (
    <main className={className}>
      <h1 className="visually-hidden">{h1}</h1>
      {children}
      <Notification/>
    </main>
  );
};

export default MainSection;