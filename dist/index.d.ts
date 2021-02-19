/**
 * A type that describes the properties and functions available directly without
 * using the `ok` property as discriminator for results wrapped with either an
 * {@link Ok} or an {@link Err}.
 */
declare type Uncertain = {
    ok: boolean;
    getOr: (defaultValue: any) => any;
    getOrRun: <S>(fn: () => S) => any;
    getOrThrow: (err?: Error | string) => any;
    mapWithDefault: <S, R>(defaultValue: S, fn: (parameter: any) => R) => R;
};
/**
 * A type that describes the properties and functions available for results
 * wrapped with an {@link Ok} where the `ok` discriminator is true
 */
declare type Ok<T> = {
    ok: true;
    get: () => T;
    map: <S>(fn: (parameter: T) => S) => S;
    getOr: <S>(defaultValue: S) => T;
    getOrRun: <S>(fn: () => S) => T;
    getOrThrow: (err?: Error | string) => T;
    mapWithDefault: <S, R>(defaultValue: S, fn: (parameter: T) => R) => R;
} & Uncertain;
/**
 * A type that describes the properties and functions available for results
 * wrapped with an {@link Err} where the `ok` discriminator is false
 */
declare type Err<E> = {
    ok: false;
    getError: () => E;
    getOr: <S>(defaultValue: S) => S;
    getOrRun: <S>(fn: () => S) => S;
    getOrThrow: (err?: Error | string) => never;
    mapWithDefault: <S, R>(defaultValue: S, fn: (parameter: S) => R) => R;
} & Uncertain;
/**
 * A union type for objects of type {@link Ok} or {@link Err}. The discriminator
 * for whether the object is `Ok` or `Err` is the `ok` property.
 */
export declare type Result<T, E> = Ok<T> | Err<E>;
/**
 * The Ok function takes a value of type `T` and returns an object with the type
 * of `Ok<T>`
 */
export declare const Ok: <T>(value: T) => Ok<T>;
/**
 * The Err function takes a value of type `E` and returns an object with the
 * type of `Err<E>`
 */
export declare const Err: <E>(errorValue: E) => Err<E>;
export {};
