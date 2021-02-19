/**
 * A type that describes the properties and functions available directly without
 * using the `ok` property as discriminator for results wrapped with either an
 * {@link Ok} or an {@link Err}.
 */
type Uncertain = {
    ok: boolean
    getOr: (defaultValue: any) => any
    getOrRun: <S>(fn: () => S) => any
    getOrThrow: (err?: Error | string) => any
    mapWithDefault: <S, R>(defaultValue: S, fn: (parameter: any) => R) => R
}

/**
 * A type that describes the properties and functions available for results
 * wrapped with an {@link Ok} where the `ok` discriminator is true
 */
type Ok<T> = {
    ok: true
    get: () => T
    map: <S>(fn: (parameter: T) => S) => S

    getOr: <S>(defaultValue: S) => T
    getOrRun: <S>(fn: () => S) => T
    getOrThrow: (err?: Error | string) => T
    mapWithDefault: <S, R>(defaultValue: S, fn: (parameter: T) => R) => R
} & Uncertain

/**
 * A type that describes the properties and functions available for results
 * wrapped with an {@link Err} where the `ok` discriminator is false
 */
type Err<E> = {
    ok: false
    getError: () => E

    getOr: <S>(defaultValue: S) => S
    getOrRun: <S>(fn: () => S) => S
    getOrThrow: (err?: Error | string) => never
    mapWithDefault: <S, R>(defaultValue: S, fn: (parameter: S) => R) => R
} & Uncertain

/**
 * A union type for objects of type {@link Ok} or {@link Err}. The discriminator
 * for whether the object is `Ok` or `Err` is the `ok` property.
 */
export type Result<T, E> = Ok<T> | Err<E>

/**
 * The Ok function takes a value of type `T` and returns an object with the type
 * of `Ok<T>`
 */
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

/**
 * The Err function takes a value of type `E` and returns an object with the
 * type of `Err<E>`
 */
export const Err = <E>(errorValue: E): Err<E> => ({
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
