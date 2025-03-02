import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";
import { prisma } from "@/prisma/db";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

export type Context = {
  prisma: typeof prisma;
};

const apolloServer = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async () => ({ prisma }),
});

export { handler as GET, handler as POST };
