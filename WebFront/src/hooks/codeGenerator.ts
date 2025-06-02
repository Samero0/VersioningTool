import { useState } from "react";
import { ChangeEvent } from "react";

export const useHandlerState = () =>{ 
    
    const [value, setInputValue] = useState<string>('')
    
    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
    };

    const setValue = (newValue: string) => {
        setInputValue(newValue);
    };

    return {value, handleChange, setValue}
};

export const codeGenerator = (date: string, version: string, content: string) => {
    return () => {
        return `[{"version":"${version}", "date":"${date}", "content":"${content}"}]`;
    };
};