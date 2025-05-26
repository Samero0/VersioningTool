import { styled } from 'styled-components'

interface InputProps{
    id : string
    value? : string
    placeholder? : string
    onChange? : (e : React.ChangeEvent<HTMLInputElement>) => void
}

const StyledInput = styled.input`
    padding: 10px 20px;
    color: black;
    border: 1px #6E6E6E solid;
    border-radius: 10px;
    &::placeholder{
        opacity:1;
        color: #6E6E6E;
    }
`;

const Input : React.FC<InputProps> = ({id, placeholder, value, onChange}) => {
    return (
        <StyledInput id={id} placeholder={placeholder} value={value} onChange={onChange}></StyledInput>
    );
};

export default Input;