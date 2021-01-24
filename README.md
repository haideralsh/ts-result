![result-ts logo](logo.png)

# result-ts

> A zero-dependency Result type for Typescript inspired by Rust
## Usage

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

### Example

Let us say that we want to insert a user into our database:

```typescript
function insert(info: UserInfo): User {
    const user = new User(info)
    return new UserService.insert(user)
}
```

However, an insertion operation can sometimes fail. There is no way for the
caller of the function above to know that such failure could happen without diving into the implementation of the function.

We could handle the potential failure ourselves and return nothing when the
failure happens:

```typescript
function insert(info: UserInfo): User | null {
    const user = new User(info)

    try {
        return new UserService.insert(user)
    } catch (err) {
        console.log(err)
        return null
    }
}
```

If TypeScript is configured properly, this could be an improvement since TypeScript
will warn the caller that the result may be `null`. However, it doesn't provide them
a way to know what is the error that occurred.

We can change the null to be a string instead:

```typescript
function insert(info: UserInfo): User | string {
    const user = new User(info)

    try {
        return new UserService.insert(user)
    } catch (err) {
        console.log(err)
        return err.message
    }
}
```

This is not any better because now we lose the TypeScript null warning and we still
have to check if the returned type is a `string` or a `User` which can be non-trivial.

This problem becomes more pronounced when both the okay and error results share the same type.
Let us say we only want to return the user id instead of the whole `User` object:

```typescript
function insert(info: UserInfo): string {
    const user = new User(info)

    try {
        const user = new UserService.insert(user)
        return user.id
    } catch (err) {
        console.log(err)
        return err.message
    }
}
```

Now we can not tell if the string returned is the id or the error message.

This is where the `Result` type comes in. It provides a more elegant way for
handling potentially erroneous results.

We can rewrite the above example into this:

```typescript
import { Result, Ok, Err } from 'result-ts'

function insert(info: UserInfo): Result<string, string> {
    const user = new User(info)

    try {
        const user = new UserService.insert(user)
        return Ok(user.id)
    } catch (err) {
        console.log(err)
        return Err('An error has occurred while inserting the user')
    }
}
```

Now the caller of this function can use the `ok` attribute to know which type of
result is returned

```typescript
const insertResult = insert(info)

if (insertResult.ok === true) {
    const userId = insertResult.get()
} else {
    const errorMsg = insertResult.getError()
}
```
