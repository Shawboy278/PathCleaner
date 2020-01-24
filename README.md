# PathCleaner

This is a rewrite of the original that was implemented in Ruby and never released publicly.

I wrote this as a project as a way to dip my toes into TypeScript. Being that, my coding patterns may not follow what's typical of JS/TS.

## Build

```shell
yarn build
```

## Test

```shell
yarn test
```

## Run

| Flag         | Description |
| ------------ | ----------- |
| -p, --path   | The path to clean [Required] |
| -a, --age    | The maximum age of a file in days [Default = 15] |
| -s, --source | Where the age is obtained from [Default = LastModifiedTime] |

```shell
yarn start --path ~/temp [--age 90] [--source LastModifiedTime]
```
