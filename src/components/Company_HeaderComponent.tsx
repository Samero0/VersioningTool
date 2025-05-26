import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import companyLogo from "../assets/company-logo.svg";

const HeaderComponent: React.FC = () => {
  return (
    <>
      <Header logo={companyLogo} alt="company-logo" />
      <NavBar
        links={[
          { to: "/", text: "Home" },
          { to: "/portal-updates", text: "Portal Updates" },
          { to: "/release-notes", text: "Release Notes" },
        ]}
      />
    </>
  );
};

export default HeaderComponent;
