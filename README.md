# [Capture the Ether](https://capturetheether.com/) THE GAME OF ETHEREUM SMART CONTRACT SECURITY

### Note:

Since solidity version used by capture the ether challenges is old (`0.4.x`), my intention (beside solving the challenges) was to update the code to run with latest Solidity version. But as I found later many weaknesses were fixed as Solidity evolved. Depending on context, I updated the challenges code or used old solidity syntax and compiler version.

# Getting Started

## Requirements

-   git

    -   You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`

-   Nodejs

    -   You'll know you've installed nodejs right if you can run:
        -   `node --version` and get an ouput like: `vx.x.x`

-   Yarn instead of `npm`
    -   You'll know you've installed yarn right if you can run:
        -   `yarn --version` and get an output like: `x.x.x`
        -   You might need to install it with `npm`

## Quickstart

```
git clone git@github.com:AlexCZM/CaptureTheEther.git
cd CaptureTheEther
yarn install
```

## Testing

```
yarn hardhat test
```

to run all tests OR

```
yarn hardhat test --grep "x"
```

to run the `x`-th test (with x from 1 to 12)
