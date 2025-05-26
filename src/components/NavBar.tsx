import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

interface NavBarProps {
  links: LinkProps[];
}

interface LinkProps {
  to: string;
  text: string;
}

const NavContainer = styled.nav`
  background-color: #3d74b4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const NavBar: React.FC<NavBarProps> = ({ links }) => {
  return (
    <NavContainer>
      <NavLinks>
        {links.map((link, index) => (
          <StyledLink key={index} to={link.to}>
            {link.text}
          </StyledLink>
        ))}
      </NavLinks>
    </NavContainer>
  );
};

export default NavBar;
