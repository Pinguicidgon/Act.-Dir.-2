// main.ts
import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts";
import { MongoClient } from "mongodb";
import { FlightModel } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";

const MONGO_URL = "mongodb+srv://otheruser:123456aaabbb@nebrija-cluster.ad1qt.mongodb.net/?retryWrites=true&w=majority&appName=Nebrija-Cluster";

if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("flightsDB");
const FlightsCollection = mongoDB.collection<FlightModel>("flights");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ FlightsCollection }),
  listen: { port: 8000 }, // puerto 8000
});

console.info(`Server ready at ${url}`);
