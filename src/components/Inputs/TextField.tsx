import "../Inputs/TextField.scss"

type TextFieldType = "text" | "number" | "date" | "file"

type TextFieldValueType<T extends TextFieldType> = T extends "number" ? number : string

interface ITextFieldProps<T extends TextFieldType = "text"> {
    onChange?: (value: TextFieldValueType<T>) => void
    placeholder?: string
    value?: TextFieldValueType<T>
    className?: string
    type?: T
}

export const TextField = <T extends TextFieldType = "text">({ onChange, placeholder, value, className, type = "text" as T }: ITextFieldProps<T>) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        switch (type) {
            case "text":
                onChange(value as TextFieldValueType<T>)
                break
            case "number":
                const valueAsNumber = Number(value)
                onChange(valueAsNumber as TextFieldValueType<T>)
                break
            case "date":
                const valueAsDate = Date()
                onChange(valueAsDate as TextFieldValueType<T>)
            default:
                console.log("Type Error")
        }
    }

    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            className={`base-input ${className}`} />
    )
}

TextField.defaultProps = {
    type: "text",
}