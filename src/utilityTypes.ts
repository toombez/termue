export type GetStringArrayValues<
    A extends ReadonlyArray<string>
> = A[number]

export type AddStringPrefix<
    Prefix extends string,
    Target extends string,
> = `${Prefix}${Target}`

export type SnakeCaseToCamelCase<
    S extends string
> = S extends `${infer FirstWord}_${infer SecondWord}${infer Rest}`
    ? `${AddStringPrefix<
        AddStringPrefix<
            Lowercase<FirstWord>,
            Uppercase<SecondWord>
        >,
        SnakeCaseToCamelCase<Rest>
    >}`
    : Lowercase<S>

export type CamelCaseToSnakeCase<
    S extends string
> = S extends `${infer FirstWord}${infer Rest}`
    ? `${AddStringPrefix<
            FirstWord extends Capitalize<FirstWord> ? "_" : "",
            AddStringPrefix<
                Lowercase<FirstWord>,
                CamelCaseToSnakeCase<Rest>
            >
        >}`
    : S

export type CamelCaseToPascalCase<
    S extends string
> = S extends `${infer FirstChar}${infer Rest}`
    ? `${AddStringPrefix<
        Capitalize<FirstChar>,
        Rest
    >}`
    : S

export type CamelCaseToKebabCase<
    S extends string
> = S extends `${infer FirstWord}${infer Rest}`
    ? Rest extends Uncapitalize<Rest>
        ? `${Uncapitalize<FirstWord>}${CamelCaseToKebabCase<Rest>}`
        : `${Uncapitalize<FirstWord>}-${CamelCaseToKebabCase<Rest>}`
    : '';
