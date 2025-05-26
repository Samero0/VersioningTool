import React from "react";
import { styled } from 'styled-components'

interface HeaderProps{
    logo : string;
    alt : string; 
}

const HeaderWrapper = styled.header`
    display: flex;
    flex-direction: row;
    padding:10px;
`;

const Logo = styled.img`
    width: 80px;
    height: 30px;
`;

const Header : React.FC<HeaderProps> = ({logo, alt}) =>{
    return(
        <HeaderWrapper>
            <Logo src={logo} alt={alt}/>
        </HeaderWrapper>

    )
}

export default Header