# Stack-Template

Base repository for React Frontend + Express Backend

Features:
* typescript
* eslint (with typescript-eslint)
* prettier
* winston (for backend logging)
* Dockerfile

This multi-package repository uses [pnpm](https://pnpm.js.org/).

## Dev environment

start the servers with `npm recursive dev` and access the React
server at `http://localhost:3000`. It will proxy every request to
`/api` to `http://localhost:3001/api`, which is where the backend
is running from.

### The api suffix

The backend root suffix can be controlled by the `API_PREFIX`
environment variable.

## What is missing

* Some initial bare-bones test setup
* Production build instructions
* Server side rendering

## What this project has no intention to have

* Database setup
* Any sort of authentication
* Use of any other package management other than pnpm

Those are up to the users to build on top of this template.

# Author

- [Sergio Moura](https://sergio.moura.ca/)
