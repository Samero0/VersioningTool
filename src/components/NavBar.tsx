import { Link } from "react-router-dom";
import React from "react";
import { SingleSelectionDropdown } from 'teno-dropdown-component';
import { styled } from "styled-components";

interface NavBarProps {
  links: LinkProps[];
  dropdownProps: React.ComponentProps<typeof SingleSelectionDropdown>;
  dropdownDBProps: React.ComponentProps<typeof SingleSelectionDropdown>;
}

interface LinkProps {
  to: string;
  text: string;
}

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

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

const NavBar: React.FC<NavBarProps> = ({ links, dropdownProps, dropdownDBProps }) => {
  return (

  <NavContainer>
    <NavLinks>
      {links.map((link, index) => (
        <StyledLink key={index} to={link.to}>
          {link.text}
        </StyledLink>
      ))}
    </NavLinks>
    <RightContainer>
      <SingleSelectionDropdown {...dropdownProps} />
      <SingleSelectionDropdown {...dropdownDBProps} />
    </RightContainer>
  </NavContainer>


  );
};

export default NavBar;
