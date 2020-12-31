type Uncertain = {
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
} & Uncertain

type Err<T> = {
    ok: false
    getError: () => T

    getOr: <S>(defaultValue: S) => S
    getOrRun: <S>(fn: () => S) => S
    getOrThrow: (err?: Error | string) => never
    mapWithDefault: <S, R>(defaultValue: S, fn: (parameter: S) => R) => R
} & Uncertain

export type Result<T, E> = Ok<T> | Err<E>

export const Ok = <T>(value: T): Ok<T> => ({
    ok: true,
    get: () => value,
    map: (fn) => fn(value),

    getOr: <S>(defaultValue: S): T => value,
    getOrRun: <S>(fn: () => S): T => value,
    getOrThrow: (err?: string | Error): T => value,
    mapWithDefault: <S, R>(defaultValue: S, fn: (parameter: T) => R) =>
        fn(value),
})

export const Err = <T>(errorValue: T): Err<T> => ({
    ok: false,
    getError: () => errorValue,

    getOr: <S>(defaultValue: S): S => defaultValue,
    getOrRun: <S>(fn: () => S) => fn(),
    getOrThrow: (err?: Error | string): never => {
        if (err) {
            if (err instanceof Error) {
                throw err
            }
            if (typeof err === 'string') {
                throw new Error(err)
            }
        }
        if (typeof errorValue === 'string') {
            throw new Error(errorValue)
        }

        throw new Error('Attempted to retrieve value on erroneous result')
    },
    mapWithDefault: <T, R>(defaultValue: T, fn: (parameter: T) => R): R =>
        fn(defaultValue),
})
