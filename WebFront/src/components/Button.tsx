import { styled } from 'styled-components'

interface ButtonProps{
    id : string;
    text : string;
    onClick : () => void;
}

const StyledButton = styled.button`
    font-size: 16px;
    height: 40px;
    width: 300px;
    padding-left: 20px;
    padding-right: 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
    font-weight: 500;
    background-color: #3d74b4;
    color: #fff;

    &:hover{
        background-color: #134278;
    }
`;


const Button : React.FC<ButtonProps> = ({id, text, onClick}) => {
    return (

        <StyledButton id={id} onClick={onClick}>{text}</StyledButton>

    );
};

export default Button;