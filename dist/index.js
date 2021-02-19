"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.Ok = void 0;
/**
 * The Ok function takes a value of type `T` and returns an object with the type
 * of `Ok<T>`
 */
var Ok = function (value) { return ({
    ok: true,
    get: function () { return value; },
    map: function (fn) { return fn(value); },
    getOr: function (defaultValue) { return value; },
    getOrRun: function (fn) { return value; },
    getOrThrow: function (err) { return value; },
    mapWithDefault: function (defaultValue, fn) {
        return fn(value);
    },
}); };
exports.Ok = Ok;
/**
 * The Err function takes a value of type `E` and returns an object with the
 * type of `Err<E>`
 */
var Err = function (errorValue) { return ({
    ok: false,
    getError: function () { return errorValue; },
    getOr: function (defaultValue) { return defaultValue; },
    getOrRun: function (fn) { return fn(); },
    getOrThrow: function (err) {
        if (err) {
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
        }
        if (typeof errorValue === 'string') {
            throw new Error(errorValue);
        }
        throw new Error('Attempted to retrieve value on erroneous result');
    },
    mapWithDefault: function (defaultValue, fn) {
        return fn(defaultValue);
    },
}); };
exports.Err = Err;
