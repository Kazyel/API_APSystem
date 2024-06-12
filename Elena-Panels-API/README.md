# Elena API - Solar Panels

This API fetches data from a database which is storing collected data from various solar panels that are serving the statistics for each individual solar panel.

## Project Organization

The project is organized through 3 main directories: prisma, routes and utils.

The prisma directory is mainly for working with the database through Prisma. Won't need to do anything there, unless the database is under changes, then you are going to need to update the schema file with the commands:

```sh
$ npx prisma db pull
$ npx prisma generate
```

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

# Solar Panels Layout

For the API endpoints part, we treat the given data and only returns the energy amount and each individual panel coordinates for displaying in the front-end layout.

In the front-end, the solar panels are being drawn into SVGs via various functions that build each part of the panels and their colors change dynamically based on the amount of energy produced, getting more and more blue.

The code is (for the most part) very readable and easy to understand. They're commented for better understanding, too.
