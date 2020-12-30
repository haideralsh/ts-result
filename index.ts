type UnknownResult = {
    getOr: (defaultValue: any) => any
    getOrRun: <S>(fn: () => S) => any
    getOrThrow: (err?: Error | string) => any
    mapWithDefault: <S, R>(defaultValue: S, fn: (parameter: any) => R) => R
}

type Ok<T> = {
    ok: true
    get: () => T
    map: <S>(fn: (parameter: T) => S) => S

    getOr: <S>(defaultValue: S) => T
    getOrRun: <S>(fn: () => S) => T
    getOrThrow: (err?: Error | string) => T
    mapWithDefault: <S, R>(defaultValue: S, fn: (parameter: T) => R) => R
} & UnknownResult

type Err<T> = {
    ok: false
    getError: () => T

    getOr: <S>(defaultValue: S) => S
    getOrRun: <S>(fn: () => S) => S
    getOrThrow: (err?: Error | string) => never
    mapWithDefault: <S, R>(defaultValue: S, fn: (parameter: S) => R) => R
} & UnknownResult

export type Result<T, E> = Ok<T> | Err<E>
