# Currency converter

This project was created and bootstrapped using nextjs with typescript

## Install and run locally

`npm install && npm start`

## About the project

The solution is a isomorphic frontend application that has a server side and a client side developed in just few hours (roughly 4)
with a much more focus on the user experience rather than DX.

1- server side
Also includes an endpoint to jokes endpoints, since the random jokes can't return
10 jokes, the endpoiunt act as a wrapper with `Promise.all`

2- client side
Fetches the jokes from the endpoint display them with a timer that is initially paused and can fetch a joke every 5 seconds.
A possibiblity to bookmark jokes and store them in the local storage of the client browser.

3- Deployment with ci/cd
a sample github action is under `.github/` folder to deploy the project to vercel
it isn't really deploying anything at the moment, to deploy the project we can replace the secrets with real values.

# TypeScript Next.js example

This is a really simple project that shows the usage of Next.js with TypeScript.

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-typescript)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-typescript&project-name=with-typescript&repository-name=with-typescript)

## How to use it?

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-typescript with-typescript-app
```

```bash
yarn create next-app --example with-typescript with-typescript-app
```

```bash
pnpm create next-app --example with-typescript with-typescript-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

This example shows how to integrate the TypeScript type system into Next.js. Since TypeScript is supported out of the box with Next.js, all we have to do is to install TypeScript.

```
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts` or `.tsx` files in our project and builds it. It even automatically creates a `tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.
