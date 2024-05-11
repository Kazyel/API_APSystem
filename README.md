# Elena API

This API fetches data from a database which is storing collected data from various solar panels that are serving a bunch of statistics, like the amount of energy produced in a day. Then, the received data will be shown through different charts in the Elena application.

## Project Organization

The project is organized through 3 main directories: prisma, routes and utils.

The prisma directory is mainly for working with the database through Prisma. Won't need to do anything there, unless the database is changing some fields, then you are going to need to update the schema file.

The routes directory is for all the endpoints of the project (to create more routes, take a look at the creating new routes section below).

The utils directory is for organizing functions and types that we might gonna need to use in more than one place in the project.

## Creating New Routes

To create a new route, first you gonna need to create a file in the routes directory. There you have to initialize a function like this one:

```js
const routeName = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {};
```

Inside the just created function you will initialize another function (now a proper Fastify function for the HTTP verb needed) that will do all the work with the database and manipulate and deliver the data:

```js
fastify.get(url, async (req, res) => {
    // Some code here...
});
```

Finally, just call `done()` in the end of the first one.

After creating the route endpoint and exporting the function with `export default routeName`, you will have to register it in the index.ts file. Just import the route path and call the `fastify.register(routeName)` method.
