import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { PingResolver } from "./resolvers/ping";
import { ProductResolver } from "./resolvers/ProductResolver";
import { BrandResolver } from "./resolvers/BrandResolver";

export const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver, ProductResolver, BrandResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, path: "/graphql" });

  return app;
};
