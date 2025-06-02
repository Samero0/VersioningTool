import { styled } from 'styled-components'

interface TextBoxProps{
    id: string;
    placeholder?: string;
    value?: string;
    size?: 'small' | 'large' //large by default
}

const StyledTextBox = styled.textarea<{ size: string }>`
    padding: 10px;
    background-color: #383838;
    color: white;
    width: 100%;
    height: ${(props) => (props.size === 'small' ? '125px' : '250px')};
    font-family: 'Courier New', Courier, monospace;
    font-size: 13px;
    border: 1px lightgrey solid;
    border-radius: 10px;
    box-shadow: 1px 1px lightgrey;

    &::placeholder {
        color: white;
        font-family: 'Courier New', Courier, monospace;
    }
`;

const TextBox : React.FC<TextBoxProps> = ({id, placeholder, value, size = 'large'}) => {
    return (
        <StyledTextBox id={id} placeholder={placeholder} value={value} size={size}/>
    );
}

export default TextBox;