# The E-CONTRACT Application

# What is Eslint

## Eslint is a linter

## What is a linter

### Linter analyzes your code and let you write your code under rules

When you break any some of rule, it will show you warning or error so that you you can follow the consistent and best practices code

## What is pritier?

It's a tool that help you format your code automatically when you save, typing or updating your files you don't need to fix that spacing, indentation, ect

# Setup typescript

## 1. create tsconfig.json file

### update the following things:

{
"compilerOptions": {
...
// import absolute from src instead of relative paths
"baseUrl": "src/"
},
"include": [
"src",
"src/", // all files under src/
"**/*.ts", // all ts files
"**/*.tsx", // all tsx files
]
}

# Setup Eslint

## 1. add eslint as dev/global dependency

## 2. set up eslint

### 2.1 intall eslint globally, yarn global add eslint

### 2.2 move to project folder, init eslint by typing eslint --init

### 2.3 Add the following libs as dev dependencies

yarn add --dev eslint-plugin-react @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react-hooks @typescript-eslint/parser@latest

## 3 setup prittier

### 3.1 install prettier, yarn add --dev eslint-config-prettier prettier

### 3.2 create .prettierrc.json file at the root folder

### 3.3 add prettier to eslintrc.js file as additional plugin

"extends": [
"plugin:react/recommended",
"airbnb",
"prettier"
],
