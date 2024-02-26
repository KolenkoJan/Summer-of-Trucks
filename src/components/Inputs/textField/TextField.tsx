import { observer } from "mobx-react-lite"
import "../textField/TextField.scss"
import { Text } from "../../typography/Text"
import { IJoiSchemaRule } from "../../../joi"
import React from "react"

type TextFieldType = "text" | "number" | "date" | "file"

type TextFieldValueType<T extends TextFieldType> = T extends "number" ? number : string

interface ITextFieldProps<T extends TextFieldType = "text"> {
    onChange?: (value: TextFieldValueType<T>) => void
    placeholder?: string
    value?: TextFieldValueType<T>
    className?: string
    type?: T
    label?: string
    schemaRule?: IJoiSchemaRule
}

export const TextField = observer(<T extends TextFieldType = "text">({ label, onChange, placeholder, value, className, schemaRule, type = "text" as T }: ITextFieldProps<T>) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        switch (type) {
            case "text":
            case "date":
                onChange?.(value as TextFieldValueType<T>)
                break
            case "number":
                onChange?.(Number(value) as TextFieldValueType<T>)
                break
            /*
            case "file":
                {
                    const fileInput = e.target as HTMLInputElement
                    const files = fileInput.files
                    console.log(files)

                    if (files && files.length > 0) {
                        const selectedFile = files[0]
                        onChange?.(selectedFile as TextFieldValueType<T>)
                    } else {
                        onChange?.(undefined as unknown as TextFieldValueType<T>)
                    }
                }
                break */
            default:
                console.log("Type Error")
        }
    }

    const showError = schemaRule?.isValidated && schemaRule?.errors && schemaRule.errors.length > 0

    return (
        <div className="flex flex-column gap-l">
            <div className="flex items-center gap-m">
                {label && <Text color={showError ? "error-main" : "text-primary"}>{label}</Text>}
                {schemaRule?.isRequired && (
                    <Text color="text-disabled" variant="body-s">
                        obvezno*
                    </Text>
                )}
            </div>
            <input type={type} placeholder={placeholder} onChange={handleChange} value={value || ""} className={`base-input ${className} ${showError ? "error" : ""}`} />
            {showError && (
                <Text color="error-main" className="message" variant="body-s">
                    {schemaRule?.errors?.[0].message}
                </Text>
            )}
        </div>
    )
})
