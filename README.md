![result-ts logo](logo.png)

# result-ts

> A zero-dependency Result type for TypeScript inspired by Rust
## Usage

Example adapted from the [Elm guide](https://guide.elm-lang.org/error_handling/result.html)

```js
import { Result, Ok, Err } from 'result-ts'

function isReasonableAge(age: number): Result<number, string> {
    if (age < 0) return Err('Please try again after you are born.')
    if (age > 135) return Err('Are you some kind of a turtle?')

    return Ok(age)
}

let ageResult = isReasonableAge(9000)
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
    const user = new User(name, email)
    return new db.query('insert into user values (?, ?)', name, email)
}
```

However, an insertion operation can sometimes fail. There is no way for the
caller of the function above to know that such failure could happen without diving into the implementation of the function.

We could handle the potential failure ourselves and return nothing when the
failure happens:

```typescript
function addUser(name: string, email: string): User | null {
    const user = new User(name, email)

    try {
        return new db.query('insert into user values (?, ?)', name, email)
    } catch (err) {
        return null
    }
}
```

If TypeScript is configured properly, this could be an improvement since TypeScript
will warn the caller that the result may be `null`. However, it doesn't provide them
a way to know what is the error that occurred.

We can change the null to be a string instead:

```typescript
function addUser(name: string, email: string): User | string {
    const user = new User(name, email)

    try {
        return new db.query('insert into user values (?, ?)', name, email)
    } catch (err) {
        return err.message
    }
}
```

This is not any better because now we lose the TypeScript null warning and we still
have to check if the returned type is a `string` or a `User` which can be non-trivial.

This problem becomes more pronounced when both the okay and error results share the same type.
Let us say we only want to return the user identifier instead of the whole `User` object:

```typescript
function addUser(name: string, email: string): string {
    const user = new User(name, email)

    try {
        const user = db.query('insert into user values (?, ?)', name, email)
        return user.uuid
    } catch (err) {
        return err.message
    }
}
```

Now we can not tell if the string returned is the user's UUID or the error message.

This is where the `Result` type comes in. It provides a more elegant way for
handling potentially erroneous results.

We can rewrite the above example into this:

```typescript
import { Result, Ok, Err } from 'result-ts'

function addUser(name: string, email: string): Result<string, string> {
    const user = new User(name, email)

    try {
        const user = db.query('insert into user values (?, ?)', name, email)
        return Ok(user.uuid)
    } catch (err) {
        return Err('An error has occurred while inserting the user')
    }
}
```

Now the caller of this function can use the `ok` attribute to know which type of
result is returned

```typescript
const insertResult = addUser('Micheal', 'micheal@example.com')

if (insertResult.ok === true) {
    const userId = insertResult.get()
} else {
    const errorMsg = insertResult.getError()
}
```

## API

### Types

#### `Result<T, S>`

A `Result` type accepts two generic types. The first (`T`) must match the object type
passed to `Ok`, while the second (`S`) must match the object type passed to `Err`.

A function with a return type `Result` _must_ return both an `Ok` and an `Err` results
that match their respective types.
