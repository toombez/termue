import {
    AddStringPrefix,
    CamelCaseToSnakeCase
} from "./utilityTypes"

export function camelCaseToSnakeCase<S extends string>(
    string: S
): CamelCaseToSnakeCase<S> {
    const result = string
        .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

    return result as CamelCaseToSnakeCase<S>
}

export function convertToConstant<S extends string>(
    string: S
): Uppercase<CamelCaseToSnakeCase<S>> {
    const result = camelCaseToSnakeCase(string)

    return result.toUpperCase() as Uppercase<CamelCaseToSnakeCase<S>>
}

export function addStringPrefix<
    P extends string,
    S extends string,
>(
    prefix: P,
    string: S,
): AddStringPrefix<P, S> {
    return (prefix + string) as AddStringPrefix<P, S>
}
