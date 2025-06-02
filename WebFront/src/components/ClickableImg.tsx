import React from "react";
import { styled } from "styled-components";

interface ClickableImgProps {
    imageSrc: string;
    alt: string;
    active: boolean;
    tooltip?: string; 
    onClick?: () => void;
}

const StyledImgContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const StyledImg = styled.img<{ active: boolean }>`
    width: 23px;
    height: 30px;
    padding: 3px;
    cursor: pointer;
    display: ${({ active }) => (active ? "block" : "none")};

    &:hover + div {
        opacity: 1;
        visibility: visible;
    }

    &:hover{
        border: 1px solid grey;
        border-radius: 10px;
        box-shadow: 2px 2px grey;
    }
`;

const Tooltip = styled.div`
    position: absolute;
    bottom: 120%; 
    left: 50%;
    transform: translateX(-50%);
    background-color: black;
    color: white;
    padding: 5px 8px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

const Clickableimg: React.FC<ClickableImgProps> = ({ imageSrc, alt, active, tooltip, onClick }) => {
    return (
        <StyledImgContainer>
            <StyledImg src={imageSrc} alt={alt} onClick={onClick} active={active} />
            {tooltip && <Tooltip>{tooltip}</Tooltip>}
        </StyledImgContainer>
    );
};

export default Clickableimg;
