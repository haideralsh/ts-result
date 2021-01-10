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
    const age = ageResult.get() // returns the Ok value
    // Do stuff with `age`
} else {
    console.error(ageResult.getError()) // returns the Err value
}
```
