---
title: 'NPM Dependencies vs DevDependencies'
date: 2020-10-24 17:00:00
summary: 'When you build a JavaScript library, dependencies and devDependencies matter. This post examines 
the difference between dependencies and devDependencies in NPM.'
meta: 'When you build a JavaScript library, dependencies and devDependencies matter. This post examines
the difference between dependencies and devDependencies in NPM.'
---

# What's the difference between dependencies and devDependencies in npm?

If you are creating just an application, or a service, there isn't a difference in the usage. 
However, if you are creating a library, this following key part may help you understand the 
difference:

> Anything is the devDependencies list will NOT be installed in the client application 
> while everything in the dependencies list will be.

## Why does it matter?
### Scenario 1
Imagine your library is to offer a date time parser to its users. You may be using 
eslint for your development linting check. If you decide to put it in the dependencies 
list, when user install your library package, the eslint listed in your `"dependencies"` 
list will also be installed into users' `node_modules` folder, even if users have decided
not to use any eslint feature at all for their applications. This increase the overall 
package size for their application if it is a Node JS application and also force the 
client to unnecessarily download the unused packages.

### Scenario 2
Image your library is a UI library and is TypeScript based. You may have decided to also
use another nice responsive table library as the base for your mroe customized fancy-table
component. So you may have something like `"table": "1.2.1"` in your `"dependencies"`. 
Because you are working in TypeScript, you need the type definitions of the table API. 
Luckily, they have already published `@types/table` for TypeScript users. Now the question
is clear - where should you put it? The answer is `"dependencies"` list. The reason is if 
it is left in the `"devDependencies"` list, users of your UI library won't have type 
information about the internal type where the base (table) of your fancy-table refers to. 
If your library users also develop in TypeScript, their TypeScript compiler will report 
missing type errors.

## Lesson Learned
I learned this lesson in a hard way when I had to spend the entire day troubleshooting the
TypeScript issues. Before deciding to install development related packages in the 
`"devDependencies"` list, think twice whether they are only development related, or they 
truly constitute a dependency of your library.