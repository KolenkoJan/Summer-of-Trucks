import Joi, { ObjectSchema } from "joi"

const isRelativeKey = (path: string, parentPath: string) => {
    return parentPath === "" || (path.startsWith(parentPath) && (path === parentPath || [".", "["].includes(path[parentPath.length])))
}

export interface IJoiSchemaRule {
    isRequired: boolean
    isValidated: boolean
    errors?: Joi.ValidationErrorItem[]
}

export function JoiSchema<TSchema extends object>(schema: ObjectSchema<TSchema>) {
    const result = {
        result: schema.validate(undefined, { abortEarly: false }) as Joi.ValidationResult,
        schema,
        isValidateCalled: false,
        validatedKeys: new Set(),

        get isValid() {
            return !this.result?.error
        },

        // If validate is called, this should also reflect getRule isValidated result. In fact, if this is called, all keys have been validated
        validate(value: unknown) {
            this.result = this.schema.validate(value, { abortEarly: false })
            this.isValidateCalled = true
        },

        // Add code that validates key, here you can also note that a key has been validated - that change should reflect getRule isValidated return value based on key
        validateKey(key: string, value: unknown) {
            this.result = this.schema.validate(value, { abortEarly: false })
            this.validatedKeys.add(key)
        },

        getRule(key: string): IJoiSchemaRule | undefined {
            const reach = this.schema.$_reach([key])
            const isRequired = reach._flags.presence === "required"
            const errors = isRequired
                ? this.result?.error?.details.filter((error) => isRelativeKey(key, error.path.join(".")))
                : this.result?.error?.details.filter((error) => error.path.join(".") === key)

            return {
                isRequired,
                // Return true if validate() has been called or the key has been validated
                isValidated: this.validatedKeys.has(key) ? true : this.isValidateCalled,
                errors,
            }
        },

        // Must clear properties so they look like the same as from the start
        clear() {
            this.validatedKeys.clear()
            this.isValidateCalled = false
            this.result = schema.validate(undefined, { abortEarly: false })
        },
    }

    return result
}
