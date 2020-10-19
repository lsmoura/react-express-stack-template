# Stack-Template

Base repository for React Frontend + Express Backend

Features:
* typescript
* eslint (with typescript-eslint)
* prettier
* winston (for backend logging)
* Dockerfile

This multi-package repository is built with [pnpm](https://pnpm.js.org/).

## Dev environment

start the servers with `npm recursive dev` and access the react
server at `http://localhost:3000`. It will proxy every request to
`/api` to `http://localhost:3001/api`, which is where the backend lives.

### The api suffix

The backend root suffix can be controlled by the `API_PREFIX` environment
variable.

# Author

- [Sergio Moura](https://sergio.moura.ca/)
