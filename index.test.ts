import { Result, Ok, Err } from './index'

describe('Ok object constructor', () => {
    it('sets the `ok` key on the returned object to true', () => {
        const okObj = Ok('foo')
        expect(okObj.ok).toBe(true)
    })

    /*---------------------- get ----------------------*/
    it('provides a `get` function', () => {
        const okObj = Ok('foo')
        okObj.ok === true && expect(okObj.get).toBeInstanceOf(Function)
    })

    it('returns the Ok value when calling the `get` function', () => {
        const okObj = Ok('foo')
        okObj.ok === true && expect(okObj.get()).toBe('foo')
    })

    /*---------------------- getOr ----------------------*/
    it('provides a `getOr` function', () => {
        const okObj = Ok('foo')
        okObj.ok === true && expect(okObj.getOr).toBeInstanceOf(Function)
    })

    it('returns the Ok value when calling the `getOr` function', () => {
        const okObj = Ok('foo')
        okObj.ok === true && expect(okObj.getOr('bar')).toBe('foo')
    })

    /*---------------------- getOrRun ----------------------*/
    it('provides a `getOrRun` function', () => {
        const okObj = Ok('foo')
        okObj.ok === true && expect(okObj.getOrRun).toBeInstanceOf(Function)
    })

    it('returns the Ok value when calling the `getOrRun` function', () => {
        const okObj = Ok('foo')
        okObj.ok === true && expect(okObj.getOrRun(() => 'bar')).toBe('foo')
    })

    /*---------------------- getOrThrow ----------------------*/
    it('provides a `getOrThrow` function', () => {
        const okObj = Ok('foo')
        okObj.ok === true && expect(okObj.getOrThrow).toBeInstanceOf(Function)
    })

    it('returns the Ok value when calling the `getOrThrow` function with no arguments', () => {
        const okObj = Ok('foo')
        okObj.ok === true && expect(okObj.getOrThrow()).toBe('foo')
    })

    it('returns the Ok value when calling the `getOrThrow` with a string argument', () => {
        const okObj = Ok('foo')
        okObj.ok === true &&
            expect(okObj.getOrThrow('Can not get value')).toBe('foo')
    })

    it('returns the Ok value when calling the `getOrThrow` with an Error object argument', () => {
        const okObj = Ok('foo')
        okObj.ok === true &&
            expect(okObj.getOrThrow(new Error('Can not get value'))).toBe('foo')
    })
})
