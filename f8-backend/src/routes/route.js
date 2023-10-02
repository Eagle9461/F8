const userRoute = require("./users_route");
const openaiRoutes = require("./openaiRoutes");
const customerRoutes = require("./customersRoute");
const paymentRoutes = require("./paymentRoutes");
require('@fastify/view');
const path = require("path");
const session = require("fastify-session");
const fastifyCookie = require('@fastify/cookie');
// const FastifyRedis = require('@fastify/redis');
// const jwt = require('@fastify/jwt'); 



const allRoutes = (app) => {
    const SECRET_KEY = process.env.CRYPTR_KEY;
    // fastify.register(FastifyRedis, { host: '127.0.0.1' })
    app.register(fastifyCookie, {
      // secret: SECRET_KEY, // Specify a secret key for cookie encryption (optional)
      // hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
      // parseOptions: {} 
    });
    app.register(session, {
      secret:"adskljasdsjlljrjeelfdj324kkj5224",
      hook:'preHandler',
      cookie: {
        httpOnly: true,
        maxAge: 1000*600,
        secure: false
      },
    });

    app.register(require("fastify-cors"), {
        origin: [
          "http://localhost:3000",
          'http://localhost:5000',
          "http://127.0.0.1:3000",
          'http://127.0.0.1:5000',
          "http://66.94.102.219:3000",
          "http://66.94.102.219:5000",
          "http://beta.first8marketing.com:3000", 
          "http://beta.first8marketing.com:5000", 
        ],
        credentials: true,
    });
    app.register(require('point-of-view'), {
      engine: {
        handlebars: require('handlebars'),
      },
      root: path.join(__dirname, "views"), // Points to `./views` relative to the current file
      // layout: "../views", // Sets the layout to use to `./views/templates/layout.handlebars` relative to the current file.
      viewExt: "handlebars", // Sets the default extension to `.handlebars`
      propertyName: "render", // The template can now be rendered via `reply.render()` and `fastify.render()`
      // defaultContext: {
      //   dev: process.env.NODE_ENV === "development", // Inside your templates, `dev` will be `true` if the expression evaluates to true
      // },
      options: {
        viewEngine: {
          extName: ".handlebars",
          partialsDir: path.resolve("./src/views"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./src/views"),
        extName: ".handlebars",
      }, // No options passed to handlebars
    });

    // app.register(jwt, {
    //     secret: `${process.env.JWT_SECRET}`,
    //   })
    
    app.register(userRoute);
    app.register(openaiRoutes);
    app.register(customerRoutes);
    app.register(paymentRoutes);
}

module.exports = allRoutes;