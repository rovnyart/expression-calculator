# Google-ish expression calculator (test task)


## Description

This is a simple app which renders a page with one text field and a submit button. You can enter an algebraic expression, press "Calculate" button and get a result. There are some important restrictions:

  * Only integers supported
  * Only `+,-,*,/` operations supported
  * No parenthesis 

## Tech stack used

I decided to use `Next.js` for this app. It has all of full-stack web app functionality out of the box and it's extremely fast to start writing actual logic without needing to do any boilerplate stuff, e.g. webpack configuration, separate backend & frontend connection etc. 
On a client side I chose to use `Material UI`, because I'm really big fan of it =). Even though I understand that this particular task could be done without using any design system, I just don't like to write `css` files 😎.

## Project structure

  * `__tests__` - Unit & integration tests with `jest`
  * `pages/index.ts` - Main (and the only) page
  * `pages/api/calculate.ts` - API endpoint
  * `pages/_app.tsx`, `pages/_document.tsx` - Next.js special files with Material UI boilerplate code, don't bother reading it

## Installation and running

### Install deps

```bash
npm i
```

### Run in dev mode

```bash
npm run dev
```
This will start the app on port `3000`

### Run in production mode

```bash
npm run build && npm run start
```

## Docker

This app has `Dockerfile`, so it can be run in any docker-supported environment (docker-compose, Kubernetes, Openshift, etc)

### Build image

```bash
docker build -t expression-calc:latest .
```

### Run locally

```bash
docker run -it --rm -p 3000:3000 expression-calc:latest
```


## Tests

 * Unit tests of `calculate.ts` - `__tests__/calculate.unit.test.ts`
 * Integration (API) tests of `/api/calculate` endpoint - `__tests__/calculate.api.test.ts`

### Run tests

```bash
npm run test
```

### Run test with coverage report

```bash
npm run test:coverage
```