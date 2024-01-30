import { observer } from "mobx-react-lite"
import "../textField/TextField.scss"
import { Text } from "../../typography/Text"
import { ValidationErrorItem } from "joi"
import { useState } from "react"

type TextFieldType = "text" | "number" | "date" | "file"

type TextFieldValueType<T extends TextFieldType> = T extends "number" ? number : string

interface ITextFieldProps<T extends TextFieldType = "text"> {
    onChange?: (value: TextFieldValueType<T>) => void
    placeholder?: string
    value?: TextFieldValueType<T>
    className?: string
    type?: T
    label?: string
    error?: ValidationErrorItem
}

export const TextField = observer(<T extends TextFieldType = "text">({ label, onChange, placeholder, value, className, error, type = "text" as T }: ITextFieldProps<T>) => {
    const [showError, setShowError] = useState<boolean>(false)
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

        if (value === null || value === "") {
            setShowError(true)
        } else {
            setShowError(false)
        }
    }

    return (
        <div className="flex flex-column gap-l">
            <div className="flex items-center gap-m">
                {label && <Text color={showError && error ? "error-main" : "text-primary"}>{label}</Text>}
                {error ? (
                    <Text color="text-disabled" variant="body-s">
                        obvezno*
                    </Text>
                ) : undefined}
            </div>
            <input type={type} placeholder={placeholder} onChange={handleChange} value={value || ""} className={`base-input ${className} ${showError && error ? "error" : ""}`} />
            {error && showError ? (
                <Text color="error-main" className="message" variant="body-s">
                    {error.message}
                </Text>
            ) : undefined}
        </div>
    )
})
