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

    /*---------------------- map ----------------------*/
    it('returns an object with a `map` function', () => {
        const okObj = Ok('foo')
        okObj.ok === true && expect(okObj.map).toBeInstanceOf(Function)
    })

    it('provides the Ok value to the map function', () => {
        const okObj = Ok('foo')
        okObj.ok === true && okObj.map((x) => expect(x).toBe('foo'))
    })

    it('applies the map function on the Ok value', () => {
        const okObj = Ok('foo')
        okObj.ok === true &&
            expect(okObj.map((x) => x.toUpperCase())).toBe('FOO')
    })

    /*---------------------- mapWithDefault ----------------------*/
    it('returns an object with a `mapWithDefault` function', () => {
        const okObj = Ok('foo')
        okObj.ok === true &&
            expect(okObj.mapWithDefault).toBeInstanceOf(Function)
    })

    it('provides the Ok value to the mapWithDefault function', () => {
        const okObj = Ok('foo')
        okObj.ok === true &&
            okObj.mapWithDefault('bar', (x) => expect(x).toBe('foo'))
    })

    it('applies the mapWithDefault function on the Ok value', () => {
        const okObj = Ok('foo')
        okObj.ok === true &&
            expect(okObj.mapWithDefault('bar', (x) => x.toUpperCase())).toBe(
                'FOO'
            )
    })
})

describe('Err object constructor', () => {
    it('sets the `ok` key on the returned object to false', () => {
        const errObj = Err('foo')
        expect(errObj.ok).toBe(false)
    })

    /*---------------------- getError ----------------------*/
    it('provides a `getError` function', () => {
        const errObj = Err('foo')
        errObj.ok === false && expect(errObj.getError).toBeInstanceOf(Function)
    })

    it('returns the Err value when calling the `getError` function', () => {
        const errObj = Err('foo')
        errObj.ok === false && expect(errObj.getError()).toBe('foo')
    })

    /*---------------------- getOr ----------------------*/
    it('provides a `getOr` function', () => {
        const errObj = Err('foo')
        errObj.ok === false && expect(errObj.getOr).toBeInstanceOf(Function)
    })

    it('returns the passed value when calling the `getOr` function', () => {
        const errObj = Err('foo')
        errObj.ok === false && expect(errObj.getOr('bar')).toBe('bar')
    })

    /*---------------------- getOrRun ----------------------*/
    it('provides a `getOrRun` function', () => {
        const errObj = Err('foo')
        errObj.ok === false && expect(errObj.getOrRun).toBeInstanceOf(Function)
    })

    it('runs the passed function value when calling the `getOrRun` function', () => {
        const errObj = Err('foo')
        errObj.ok === false && expect(errObj.getOrRun(() => 'bar')).toBe('bar')
    })

    /*---------------------- getOrThrow ----------------------*/
    it('provides a `getOrThrow` function', () => {
        const errObj = Err('foo')
        errObj.ok === false &&
            expect(errObj.getOrThrow).toBeInstanceOf(Function)
    })

    it('throws error when calling the `getOrThrow` function with no arguments', () => {
        const errObj = Err('foo')
        errObj.ok === false &&
            expect(() => {
                errObj.getOrThrow()
            }).toThrowError()
    })

    it('throws error with the passed string when calling the `getOrThrow` with a string argument', () => {
        const errObj = Err('foo')
        errObj.ok === false &&
            expect(() => {
                errObj.getOrThrow('Can not get value')
            }).toThrow(new Error('Can not get value'))
    })

    it('throws the passed error when calling the `getOrThrow` with an Error object argument', () => {
        const errObj = Err('foo')
        errObj.ok === false &&
            expect(() => {
                errObj.getOrThrow(new Error('Can not get value'))
            }).toThrow(new Error('Can not get value'))
    })
})
