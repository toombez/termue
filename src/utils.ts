import { CamelCaseToSnakeCase } from "./utilityTypes"

export function camelCaseToSnakeCase<T extends string>(
    string: T
): CamelCaseToSnakeCase<T> {
    const result = string
        .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

    return result as CamelCaseToSnakeCase<T>
}
