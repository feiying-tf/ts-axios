{
  "name": "axios",
  "version": "0.0.0",
  "description": "",
  "keywords": [],
  "main": "dist/axios.umd.js",
  "module": "dist/axios.es5.js",
  "typings": "dist/types/axios.d.ts",
  "files": [
    "dist"
  ],
  "author": "--username-- <--usermail-->",
  "repository": {
    "type": "git",
    "url": ""
  },
  "license": "MIT",
  "engines": {
    "node": ">=6.0.0"
  },
  "scripts": {
    "lint": "tslint  --project tsconfig.json -t codeFrame 'src/**/*.ts' 'test/**/*.ts'",
    "prebuild": "rimraf dist",
    "build": "tsc --module commonjs && rollup -c rollup.config.ts && typedoc --out docs --target es6 --theme minimal --mode file src",
    "start": "rollup -c rollup.config.ts -w",
    "test": "jest --coverage",
    "test:watch": "jest --coverage --watch",
    "test:prod": "npm run lint && npm run test -- --no-cache",
    "deploy-docs": "ts-node tools/gh-pages-publish",
    "report-coverage": "cat ./coverage/lcov.info | coveralls",
    "commit": "git-cz",
    "semantic-release": "semantic-release",
    "semantic-release-prepare": "ts-node tools/semantic-release-prepare",
    "precommit": "lint-staged",
    "postinstall": "ts-node tools/init",
    "travis-deploy-once": "travis-deploy-once"
  },
  "lint-staged": {
    "{src,test}/**/*.ts": [
      "prettier --write",
      "git add"
    ]
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-conventional-changelog"
    }
  },
  "jest": {
    "transform": {
      ".(ts|tsx)": "ts-jest"
    },
    "testEnvironment": "node",
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ],
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "/test/"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 90,
        "functions": 95,
        "lines": 95,
        "statements": 95
      }
    },
    "collectCoverageFrom": [
      "src/*.{js,ts}"
    ]
  },
  "prettier": {
    "semi": false,
    "singleQuote": true
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  },
  "devDependencies": {
    "@commitlint/cli": "^7.1.2",
    "@commitlint/config-conventional": "^7.1.2",
    "@types/jest": "^25.1.3",
    "@types/node": "^10.11.0",
    "@types/qs": "^6.9.1",
    "body-parser": "^1.19.0",
    "colors": "^1.3.2",
    "commitizen": "^3.0.0",
    "cookie-parser": "^1.4.4",
    "coveralls": "^3.0.2",
    "cross-env": "^5.2.0",
    "cz-conventional-changelog": "^2.1.0",
    "express": "^4.17.1",
    "husky": "^1.0.1",
    "jest": "^25.1.0",
    "jest-config": "^25.1.0",
    "lint-staged": "^8.0.0",
    "lodash.camelcase": "^4.3.0",
    "prettier": "^1.14.3",
    "prompt": "^1.0.0",
    "qs": "^6.9.1",
    "replace-in-file": "^3.4.2",
    "rimraf": "^2.6.2",
    "rollup": "^0.67.0",
    "rollup-plugin-commonjs": "^9.1.8",
    "rollup-plugin-json": "^3.1.0",
    "rollup-plugin-node-resolve": "^3.4.0",
    "rollup-plugin-sourcemaps": "^0.4.2",
    "rollup-plugin-typescript2": "^0.18.0",
    "semantic-release": "^15.9.16",
    "shelljs": "^0.8.3",
    "travis-deploy-once": "^5.0.9",
    "ts-jest": "^25.2.1",
    "ts-loader": "^6.2.1",
    "ts-node": "^7.0.1",
    "tslint": "^5.11.0",
    "tslint-config-prettier": "^1.15.0",
    "tslint-config-standard": "^8.0.1",
    "tslint-loader": "^3.5.4",
    "typedoc": "^0.12.0"
  },
  "dependencies": {
    "global": "^4.4.0",
    "increase-memory-limit": "^1.0.7",
    "typescript": "3.0.3"
  }
}
