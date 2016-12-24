# Remapper

Remapper maps one object into another using a mapping configuration overrides. By default, all properties from the source object will be remapped as-is to the destination object unless, an _override_ is provided.

Example:

```js
import Mapper from 're-mapper';
const mapper = new Mapper({
  'firstName': 'first_name',
  'lastName': 'last_name',
});

const source = {
  id: 1,
  firstName: 'John',
  lastName: 'Citizen',
  email: 'john@citizen.com'
};

const target = mapper.map(source);

// target:
// {
//   id: 1,
//   first_name: 'John',
//   last_name: 'Citizen',
//   email: 'john@citizen.com'
// }
```
