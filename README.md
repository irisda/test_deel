# Playwright Test Repository

This repository contains end-to-end tests for Demo Sauce Portal using Playwright with TypeScript and managed dependencies via pnpm.

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

-   Node.js (recommended version 20.x or higher)
-   pnpm (you can install it running the command: `corepack use pnpm@9.x`)
-   .env file fulfilled (based on .env.dev)

### Installing

Install dependencies using pnpm:

```bash
pnpm install
```
Playwright requires additional system dependecies, to install them run sequentially:

```bash
pnpm pw:i
```
This command will install PW's dependecies to your machine and required browsers

### Running

To run all the test just run:

```bash
pnpm test
```

### Notes

If `pnpm install` throws an error with package conflicts, just use `pnpm i --force` to avoid this error

## Configuration

Simply, if you need to create a suit of tests using different setups, projects and etc. then create a new config file with template file name `playwright.{CONFIG_NAME}.config.ts` and add an additional command to run tests using this config file to [`package.json`](./package.json)