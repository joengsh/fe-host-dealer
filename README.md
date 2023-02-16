# fe-host-dealer

## Getting Started

```bash
# install
yarn

# develop
yarn dev

# build
yarn build
```

## convertional commit message

https://www.conventionalcommits.org/en/v1.0.0/ <br />
https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional

## Sample card value

**Overview**

```
Scanner 1: AHA, AH2, AH3 etc......
Scanner 2: BHA, BH2, BH3 etc......
Scanner 3: CHA, CH2, CH3 etc......
Scanner 4: DHA, DH2, DH3 etc......
Scanner 5: EHA, EH2, EH3 etc......
Scanner 6: FHA, FH2, FH3 etc......

Heart: HA, H2, H3 etc....... H0, HJ, HQ, HK
Spade: SA, S2, S3 etc...... S0, SJ, SQ, SK
Club: CA, C2, C3 etc....... C0, CJ, CQ, CK
Diamond: DA, D2, D3 etc...... D0, DJ, DQ, DK

```

Set 1 (Need Extra):

```
AS2
BD3

DH6
EC4

EXTRA:
CC4
FC7
```

Set 2 (No need extra):

```
AS5
BD3

DH2
EC4
```

Set 3 (with Red Card):

***RC stands for Red Card***

```
ARC
BRC

DRC
ERC
```

## Overview

Built with `vert` (vite-electron-react-tailwind)

Forked from **[vite-react-electron](https://github.com/caoxiemeihao/vite-react-electron)** as of commit `7d92423`

- All files are built via `Vite`, it is super fast compared to Webpack.

