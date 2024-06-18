export type GetStringArrayValues<
    A extends ReadonlyArray<string>
> = A[number]

export type AddStringPrefix<
    Prefix extends string,
    Target extends string,
> = `${Prefix}${Target}`
