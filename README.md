# ReMapper

[![Build Status](https://travis-ci.org/socsieng/re-mapper.svg?branch=master)](https://travis-ci.org/socsieng/re-mapper)

Remapper maps one object into another using a mapping configuration overrides. By default, all properties from the source object will be remapped as-is to the destination object unless, an _override_ is provided.

It was created to help with mapping between JavaScript objects and relation database models.

## Usage

Basic mapping example: 

```js
import ReMapper from 're-mapper';
const mapper = new ReMapper({
  'firstName': 'first_name',
  'lastName': 'last_name',
});

const source = {
  id: 1,
  firstName: 'John',
  lastName: 'Citizen',
  email: 'john@citizen.com'
};

const mapped = mapper.map(source);

// mapped:
// {
//   id: 1,
//   first_name: 'John',
//   last_name: 'Citizen',
//   email: 'john@citizen.com'
// }
```

Array mapping example:

```js
const sourceList = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Citizen',
    email: 'john@citizen.com'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@doe.com'
  }
];

const mappedList = sourceList.map(mapper.map);
```

The reverse mapping is also available with the `reversMap` method which inverts the mapping definition.

Example:

```js
import ReMapper from 're-mapper';
const mapper = new ReMapper({
  'firstName': 'first_name',
  'lastName': 'last_name',
});

const mapped = {
  id: 1,
  first_name: 'John',
  last_name: 'Citizen',
  email: 'john@citizen.com'
};

const unmapped = mapper.reverseMap(source);

// unmapped:
// {
//   id: 1,
//   firstName: 'John',
//   lastName: 'Citizen',
//   email: 'john@citizen.com'
// }
```
