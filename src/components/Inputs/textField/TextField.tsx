import { observer } from "mobx-react-lite"
import "../textField/TextField.scss"
import { Text } from "../../typography/Text"

type TextFieldType = "text" | "number" | "date" | "file"

type TextFieldValueType<T extends TextFieldType> = T extends "number" ? number : string

interface ITextFieldProps<T extends TextFieldType = "text"> {
    onChange?: (value: TextFieldValueType<T>) => void
    placeholder?: string
    value?: TextFieldValueType<T>
    className?: string
    type?: T
    label?: string
}

export const TextField = observer(<T extends TextFieldType = "text">({ label, onChange, placeholder, value, className, type = "text" as T }: ITextFieldProps<T>) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        switch (type) {
            case "text":
            case "date":
                onChange(value as TextFieldValueType<T>)
                break
            case "number":
                onChange(Number(value) as TextFieldValueType<T>)
                break
            default:
                console.log("Type Error")
        }
    }

    return label ? (
        <div className="flex flex-column gap-l">
            <Text>{label}</Text>
            <input type={type} placeholder={placeholder} onChange={handleChange} value={value || ""} className={`base-input ${className}`} />
        </div>
    ) : (
        <input type={type} placeholder={placeholder} onChange={handleChange} value={value || ""} className={`base-input ${className}`} />
    )
})
