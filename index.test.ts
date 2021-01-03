import { Result, Ok, Err } from './index'

describe('Ok object constructor', () => {
    it('sets the `ok` key on the returned object to true', () => {
        const okObj = Ok('foo')
        expect(okObj.ok).toBe(true)
    })

    /*---------------------- get ----------------------*/
    it('returns an object with a `get` function', () => {
        const okObj = Ok('foo')
        okObj.ok === true && expect(okObj.get).toBeInstanceOf(Function)
    })

    it('returns an object with a `get` function that returns the Ok value', () => {
        const okObj = Ok('foo')
        okObj.ok === true && expect(okObj.get()).toBe('foo')
    })
})
