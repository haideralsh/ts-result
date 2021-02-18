![result-ts logo](logo.png)

# result-ts

> A zero-dependency Result type for TypeScript inspired by Rust

## Usage

Example adapted from the
[Elm guide](https://guide.elm-lang.org/error_handling/result.html)

```js
import { Result, Ok, Err } from 'result-ts'

function isReasonableAge(age: number): Result<number, string> {
    if (age < 0) return Err('Please try again after you are born.')
    if (age > 135) return Err('Are you some kind of a turtle?')

    return Ok(age)
}

const ageResult = isReasonableAge(9000)

if (ageResult.ok === true) {
    const age = ageResult.get()
} else {
    console.error(ageResult.getError()) // Are you some kind of a turtle?
}
```

## What is a Result type and why should I use it?

A `Result` type is the result of a computation that may fail. The type is used
for returning and propagating errors. It is helpful to give additional
information when things go wrong.

### Example

Let us say that we want to insert a user into our database and return the user
entity back:

```typescript
function addUser(name: string, email: string): User {
    const { uuid } = db.query('insert into user values (?, ?)', name, email)
    return User.getById(uuid)
}
```

However, an insertion operation can sometimes fail. There is no way for the
caller of the function above to know that such failure could happen without
diving into the implementation of the function.

We could handle the potential failure ourselves and return nothing when the
failure happens:

```typescript
function addUser(name: string, email: string): User | null {
    try {
        const { uuid } = db.query('insert into user values (?, ?)', name, email)
        return User.getById(uuid)
    } catch (err) {
        return null
    }
}
```

If TypeScript is configured properly, this could be an improvement since
TypeScript will warn the caller that the result may be `null`. However, it
doesn't provide them a way to know what is the error that occurred.

We can change the null to be a string instead:

```typescript
function addUser(name: string, email: string): User | string {
    try {
        const { uuid } = db.query('insert into user values (?, ?)', name, email)
        return User.getById(uuid)
    } catch (err) {
        return err.message
    }
}
```

This is not any better because now we lose the TypeScript null warning and we
still have to check if the returned type is a `string` or a `User` which can be
non-trivial.

This problem becomes more pronounced when both the okay and error results share
the same type. Let us say we only want to return the user identifier instead of
the whole `User` object:

```typescript
function addUser(name: string, email: string): string {
    try {
        const { uuid } = db.query('insert into user values (?, ?)', name, email)
        return uuid
    } catch (err) {
        return err.message
    }
}
```

Now we can not tell if the string returned is the user's UUID or the error
message.

This is where the `Result` type comes in. It provides a more elegant way for
handling potentially erroneous results.

We can rewrite the above example into this:

```typescript
import { Result, Ok, Err } from 'result-ts'

function addUser(name: string, email: string): Result<string, string> {
    try {
        const { uuid } = db.query('insert into user values (?, ?)', name, email)
        return Ok(uuid)
    } catch (err) {
        return Err(err.message)
    }
}
```

Now the caller of this function can use the `ok` attribute to know which type of
result is returned

```typescript
const insertResult = addUser('Micheal', 'micheal@example.com')

if (insertResult.ok === true) {
    const userId = insertResult.get() // The user's UUID if the insertion succeeded
} else {
    const errorMsg = insertResult.getError() // The error message if the insertion failed
}
```

## API

### Types

#### `Result<T, S>`

A `Result` type accepts two generic types. The first (`T`) must match the object
type passed to `Ok`, while the second (`S`) must match the object type passed to
`Err`.

A function with a return type `Result` _must_ return both an `Ok` and an `Err`
results that match their respective types.

```typescript
import { Result, Ok, Err } from 'result-ts'

function divide(a: number, b: number): Result<number, string> {
    if (b === 0) {
        return Err('Division by zero!')
    }

    return Ok(a / b)
}
```

#### The following properties and functions are unique to a result wrapped with an `Ok` function:

#### `ok: true`

The property `ok` will always be true for objects wrapped with an `Ok`

<details>
  <summary>Example</summary>

```typescript
const okResult = OK('foo')

console.log(okResult.ok) // true
```

</details>

#### `get(): T`

The function `get` will unwrap the value wrapped with an `Ok`. You have to check the `ok` property first before being able to use `get`.

<details>
  <summary>Example</summary>

```typescript
const okResult = OK('foo')

if (okResult.ok === true) {
    console.log(okResult.get()) // foo
}
```

</details>

#### `map: <S>(fn: (parameter: T) => S): S`

The function `map` will unwrap and apply the supplied function on the value
wrapped with an `Ok`. The supplied function must accept the same type as the
wrapped value type. The return type of the `map` function will be the same as
the one of the supplied function. You have to check the `ok` property first
before being able to use `map`.

<details>
  <summary>Example</summary>

```typescript
const okResult = OK('foo')

function capitalize(str: string) {
    return str.toUpperCase()
}

if (okResult.ok === true) {
    console.log(okResult.map(capitalize)) // FOO
}
```

</details>
