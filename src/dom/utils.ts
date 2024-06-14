export type AddStringPrefix<
    T extends string,
    K extends string,
> = `${T}${K}`
