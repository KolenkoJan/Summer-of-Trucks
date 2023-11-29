import { observer } from "mobx-react-lite";
import "../Inputs/TextField.scss"

interface ITextFieldProps {
    onChange?: (value: string) => void,
    placeholder?: string
    value?: string
    className?: string
    type?: "text" | "number" | "date" | "file"
}

export const TextField: React.FC<ITextFieldProps> = observer(({ onChange, placeholder, value, className, type }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            className={`base-input ${className}`} />
    )
})

TextField.defaultProps = {
    type: "text",
}